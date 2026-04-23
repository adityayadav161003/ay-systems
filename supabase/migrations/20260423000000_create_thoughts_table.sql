-- Create thoughts table
CREATE TABLE IF NOT EXISTS public.thoughts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL CHECK (char_length(content) >= 3 AND char_length(content) <= 500),
  name TEXT CHECK (name IS NULL OR char_length(name) <= 50),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  approved BOOLEAN DEFAULT true NOT NULL
);

-- Create index for faster queries
CREATE INDEX thoughts_created_at_idx ON public.thoughts(created_at DESC);
CREATE INDEX thoughts_approved_idx ON public.thoughts(approved) WHERE approved = true;

-- Enable Row Level Security
ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved thoughts
CREATE POLICY "Anyone can read approved thoughts"
  ON public.thoughts
  FOR SELECT
  USING (approved = true);

-- Policy: Anyone can insert thoughts (they're auto-approved for now)
CREATE POLICY "Anyone can insert thoughts"
  ON public.thoughts
  FOR INSERT
  WITH CHECK (true);

-- Optional: Policy for admin to update/delete (you can add admin role later)
-- CREATE POLICY "Admins can update thoughts"
--   ON public.thoughts
--   FOR UPDATE
--   USING (auth.jwt() ->> 'role' = 'admin');

-- Add comment for documentation
COMMENT ON TABLE public.thoughts IS 'Stores user thoughts/reflections shared on the website';
