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

CREATE OR REPLACE FUNCTION public.has_recent_call(p_phone text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.call_executions
    WHERE recipient_phone = p_phone
      AND http_status >= 200
      AND http_status < 300
      AND created_at > now() - interval '5 minutes'
  );
$$;

REVOKE ALL ON FUNCTION public.has_recent_call(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_recent_call(text) TO anon, authenticated;
