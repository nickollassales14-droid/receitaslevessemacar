CREATE TABLE public.review_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id text NOT NULL,
  visitor_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (review_id, visitor_key)
);

GRANT SELECT, INSERT, DELETE ON public.review_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.review_likes TO authenticated;
GRANT ALL ON public.review_likes TO service_role;

ALTER TABLE public.review_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read likes" ON public.review_likes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "anyone can add a like" ON public.review_likes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "visitors can remove their like" ON public.review_likes FOR DELETE TO anon, authenticated USING (true);