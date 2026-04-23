# 🚀 Manual Setup Instructions - Supabase Backend

Since the CLI connection is having network issues, follow these manual steps to complete the setup:

## Step 1: Apply Database Migration Manually

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/pnxlrvzxcbdmxehsqmiu
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste this SQL:

```sql
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

-- Add comment for documentation
COMMENT ON TABLE public.thoughts IS 'Stores user thoughts/reflections shared on the website';
```

5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

## Step 2: Get Your API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:

   **Project URL:**
   ```
   https://pnxlrvzxcbdmxehsqmiu.supabase.co
   ```

   **anon/public key:**
   ```
   (Copy the long key that starts with "eyJ...")
   ```

## Step 3: Update .env.local

1. Open `.env.local` in your project
2. Replace `your_anon_key_here` with the actual anon key you copied
3. Save the file

Your `.env.local` should look like:
```
NEXT_PUBLIC_SUPABASE_URL=https://pnxlrvzxcbdmxehsqmiu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your_actual_key_here
```

## Step 4: Generate TypeScript Types

Run this command:
```bash
npx supabase gen types typescript --linked > lib/supabase/database.types.ts
```

If that fails due to network issues, the types file already has a template that will work.

## Step 5: Migrate Existing Data (Optional)

If you have existing thoughts in `data/thoughts.json`, run:
```bash
npm install dotenv
node scripts/migrate-thoughts-to-supabase.js
```

## Step 6: Test Locally

```bash
npm run dev
```

Then visit: http://localhost:3000/thoughts

## Step 7: Verify Everything Works

1. ✅ Page loads without errors
2. ✅ Can post a new thought
3. ✅ Thought appears on the page
4. ✅ Check Supabase dashboard → Table Editor → thoughts table to see the data
5. ✅ Open two browser windows and post a thought - it should appear in both instantly (real-time!)

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` has the correct values
- Restart your dev server: `npm run dev`

### "Failed to fetch thoughts"
- Check that the SQL migration ran successfully in Supabase SQL Editor
- Verify your API credentials in `.env.local`
- Check browser console for detailed errors

### Real-time not working
- Go to Supabase dashboard → Database → Replication
- Make sure Realtime is enabled for the `thoughts` table

## Next Steps

Once everything is working locally:
1. Deploy to Vercel/Netlify (see `DEPLOYMENT_GUIDE.md`)
2. Add environment variables to your hosting platform
3. Test in production

---

**Need more help?** Check the other documentation files:
- `QUICK_START.md` - Quick setup guide
- `ARCHITECTURE.md` - System architecture
- `DEPLOYMENT_GUIDE.md` - Production deployment
