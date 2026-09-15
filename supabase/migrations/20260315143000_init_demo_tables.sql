-- call execution logs (server inserts via service role)
CREATE TABLE IF NOT EXISTS public.call_executions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  recipient_phone text NOT NULL,
  bolna_execution_id text,
  bolna_status text,
  http_status integer NOT NULL,
  error_message text,
  response_body jsonb
);

CREATE INDEX IF NOT EXISTS call_executions_created_at_idx ON public.call_executions (created_at DESC);
CREATE INDEX IF NOT EXISTS call_executions_recipient_phone_idx ON public.call_executions (recipient_phone);

CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL
);

ALTER TABLE public.call_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_insert_call_executions"
  ON public.call_executions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "service_insert_feedback"
  ON public.feedback
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
