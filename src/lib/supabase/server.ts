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
  const since = new Date(Date.now() - COOLDOWN_MS).toISOString();

  const { data, error } = await supabase
    .from("call_executions")
    .select("id")
    .eq("recipient_phone", recipientPhone)
    .gte("http_status", 200)
    .lt("http_status", 300)
    .gte("created_at", since)
    .limit(1);

  if (error) {
    console.error("Cooldown check failed:", error.message);
    return false;
  }

  return (data?.length ?? 0) > 0;
}
