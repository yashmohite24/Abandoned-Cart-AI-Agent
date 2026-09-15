# Abandoned Cart Recovery Agent (Demo)

Single-page demo for the Beardo cart-abandonment voice agent powered by [Bolna](https://www.bolna.ai). Visitors read the scenario, enter a phone number, and receive an outbound AI call. Executions and feedback are logged in Supabase.

## Setup

1. Copy `.env.example` to `.env.local` and fill in values (Bolna keys from your credentials file; Supabase URL and **service role** key from the [Supabase dashboard](https://supabase.com/dashboard/project/lxczfjooxtgkuifnbefd/settings/api)).
2. Install dependencies: `npm install`
3. Run locally: `npm run dev`

## Environment variables

| Variable | Description |
| --- | --- |
| `BOLNA_API_KEY` | Bolna API bearer token |
| `BOLNA_AGENT_ID` | Agent UUID for outbound calls |
| `BOLNA_FROM_PHONE` | Optional E.164 sender number |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only key for logging (never expose to the client) |

## Database

Tables: `call_executions`, `feedback` (RLS enabled, no public policies — inserts via service role only). SQL migration: `supabase/migrations/`.

## Deploy

1. Push to GitHub (`yashmohite24/Abandoned-Cart-AI-Agent`):
   ```bash
   git push -u origin main
   ```
   If HTTPS auth fails, run `gh auth login` (or use SSH) and retry.

2. In [Vercel](https://vercel.com), import the GitHub repo and add environment variables for **Production** and **Preview**:
   - `BOLNA_API_KEY`
   - `BOLNA_AGENT_ID`
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://lxczfjooxtgkuifnbefd.supabase.co`
   - `SUPABASE_ANON_KEY` (server-only; used for inserts) **or** `SUPABASE_SERVICE_ROLE_KEY`

3. Deploy from the Vercel dashboard (or `vercel login` then `vercel --prod` locally).

Logs: Supabase → Table Editor → `call_executions` and `feedback`.
