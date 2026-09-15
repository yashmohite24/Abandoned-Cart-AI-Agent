function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getBolnaApiKey(): string {
  return required("BOLNA_API_KEY");
}

export function getBolnaAgentId(): string {
  return required("BOLNA_AGENT_ID");
}

export function getBolnaFromPhone(): string | undefined {
  const value = process.env.BOLNA_FROM_PHONE?.trim();
  return value || undefined;
}

export function getSupabaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL");
  }
  return url;
}

export function getSupabaseServerKey(): string {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    (() => {
      throw new Error(
        "Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY for server logging",
      );
    })()
  );
}
