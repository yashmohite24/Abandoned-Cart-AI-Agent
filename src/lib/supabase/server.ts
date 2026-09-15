import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerKey, getSupabaseUrl } from "../env";

export function createServiceSupabase() {
  return createClient(getSupabaseUrl(), getSupabaseServerKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export type CallExecutionLog = {
  recipient_phone: string;
  bolna_execution_id?: string | null;
  bolna_status?: string | null;
  http_status: number;
  error_message?: string | null;
  response_body?: Record<string, unknown> | null;
};

export async function logCallExecution(row: CallExecutionLog): Promise<void> {
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("call_executions").insert(row);
  if (error) {
    console.error("Failed to log call execution:", error.message);
  }
}

export async function logFeedback(row: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("feedback").insert(row);
  if (error) {
    throw new Error(error.message);
  }
}

const COOLDOWN_MS = 5 * 60 * 1000;

export async function hasRecentSuccessfulCall(recipientPhone: string): Promise<boolean> {
  const supabase = createServiceSupabase();

  const { data, error } = await supabase.rpc("has_recent_call", {
    p_phone: recipientPhone,
  });

  if (error) {
    console.error("Cooldown check failed:", error.message);
    return false;
  }

  return Boolean(data);
}
