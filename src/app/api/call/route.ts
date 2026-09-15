import { NextResponse } from "next/server";
import {
  getBolnaAgentId,
  getBolnaFromPhone,
} from "@/lib/env";
import {
  getWalletBalanceCached,
  isBalanceExhaustedMessage,
  isWalletExhausted,
  makeOutboundCall,
} from "@/lib/bolna";
import { toE164, validatePhone } from "@/lib/phone";
import { hasRecentSuccessfulCall, logCallExecution } from "@/lib/supabase/server";

type CallBody = {
  dialCode?: string;
  phone?: string;
};

export async function POST(request: Request) {
  let body: CallBody;

  try {
    body = (await request.json()) as CallBody;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const dialCode = body.dialCode?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";

  const validationError = validatePhone(dialCode, phone);
  if (validationError) {
    await logCallExecution({
      recipient_phone: dialCode + phone,
      http_status: 400,
      error_message: validationError,
    }).catch(() => undefined);

    return NextResponse.json({ ok: false, message: validationError }, { status: 400 });
  }

  const recipientPhone = toE164(dialCode, phone);

  try {
    const wallet = await getWalletBalanceCached();
    if (isWalletExhausted(wallet)) {
      await logCallExecution({
        recipient_phone: recipientPhone,
        http_status: 403,
        error_message: "Limit exhausted",
        bolna_status: "balance-low",
      }).catch(() => undefined);

      return NextResponse.json(
        { ok: false, message: "Limit exhausted" },
        { status: 403 },
      );
    }

    const onCooldown = await hasRecentSuccessfulCall(recipientPhone);
    if (onCooldown) {
      return NextResponse.json(
        {
          ok: false,
          message: "A call was already requested for this number recently. Please wait a few minutes.",
        },
        { status: 429 },
      );
    }

    const result = await makeOutboundCall({
      agentId: getBolnaAgentId(),
      recipientPhone,
      fromPhone: getBolnaFromPhone(),
      userData: { customer_name: "Rahul" },
    });

    if (!result.ok) {
      const displayMessage = isBalanceExhaustedMessage(result.message)
        ? "Limit exhausted"
        : result.message;

      await logCallExecution({
        recipient_phone: recipientPhone,
        http_status: result.status,
        error_message: displayMessage,
        response_body:
          result.data && typeof result.data === "object"
            ? (result.data as Record<string, unknown>)
            : null,
        bolna_status: isBalanceExhaustedMessage(result.message) ? "balance-low" : null,
      }).catch(() => undefined);

      return NextResponse.json(
        { ok: false, message: displayMessage },
        { status: result.status >= 400 && result.status < 600 ? result.status : 502 },
      );
    }

    await logCallExecution({
      recipient_phone: recipientPhone,
      bolna_execution_id: result.data.execution_id ?? null,
      bolna_status: result.data.status ?? "queued",
      http_status: 200,
      response_body: result.data as Record<string, unknown>,
    }).catch(() => undefined);

    return NextResponse.json({
      ok: true,
      message: "You'll receive a call shortly",
      executionId: result.data.execution_id,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong. Please try again.";

    await logCallExecution({
      recipient_phone: recipientPhone,
      http_status: 500,
      error_message: message,
    }).catch(() => undefined);

    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
