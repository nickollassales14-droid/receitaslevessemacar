CREATE TABLE public.cakto_purchase_notifications (
  order_id text PRIMARY KEY,
  buyer_key text NOT NULL,
  display_name text NOT NULL,
  offer_id text NOT NULL,
  approved_at timestamptz,
  revoked boolean NOT NULL DEFAULT false,
  received_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.cakto_purchase_notifications TO service_role;
ALTER TABLE public.cakto_purchase_notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX cakto_notifications_approved_at ON public.cakto_purchase_notifications (approved_at) WHERE revoked = false;
CREATE FUNCTION public.recent_purchase_notifications()
RETURNS TABLE (id text, buyer_key text, display_name text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
 SELECT order_id AS id, buyer_key, display_name
 FROM public.cakto_purchase_notifications
 WHERE revoked = false AND approved_at IS NOT NULL
 AND approved_at > now() - interval '24 hours' AND approved_at <= now()
 ORDER BY approved_at DESC LIMIT 30;
$$;
REVOKE ALL ON FUNCTION public.recent_purchase_notifications() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.recent_purchase_notifications() TO anon, authenticated, service_role;
COMMENT ON TABLE public.cakto_purchase_notifications IS 'Only verified Cakto events for authorized purchasers; never store full names, emails, or raw webhook bodies.';