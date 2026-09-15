import { NextResponse } from "next/server";
import {
  getWalletBalanceCached,
  isWalletExhausted,
} from "@/lib/bolna";

export async function GET() {
  try {
    const wallet = await getWalletBalanceCached();
    const active = !isWalletExhausted(wallet);

    return NextResponse.json({
      active,
      message: active ? "Active" : "Limit exhausted",
      wallet,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to check agent status";
    return NextResponse.json(
      {
        active: false,
        message: "Limit exhausted",
        error: message,
      },
      { status: 503 },
    );
  }
}
