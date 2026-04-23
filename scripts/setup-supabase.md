# Supabase Setup Guide

Follow these steps to set up Supabase for your thoughts feature:

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 2: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: `ay-systems` (or your choice)
   - Database password: (save this securely)
   - Region: Choose closest to your users
5. Wait for project to be created (~2 minutes)

## Step 3: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

## Step 5: Login to Supabase CLI

```bash
supabase login
```

This will open your browser for authentication.

## Step 6: Link Your Project

```bash
# Initialize Supabase in your project (already done)
# supabase init --yes

# Link to your hosted project
supabase link --project-ref YOUR_PROJECT_REF
```

To find your project ref:
- Go to your Supabase dashboard
- Settings → General
- Copy the "Reference ID"

## Step 7: Push Database Migration

```bash
# Push the migration to create the thoughts table
supabase db push
```

This will create the `thoughts` table with proper structure and security policies.

## Step 8: Generate TypeScript Types

```bash
# Generate types from your database schema
supabase gen types typescript --linked > lib/supabase/database.types.ts
```

## Step 9: Install Dependencies

```bash
npm install @supabase/supabase-js
```

## Step 10: Migrate Existing Data (Optional)

If you have existing thoughts in `data/thoughts.json`, run this script to migrate them:

```bash
node scripts/migrate-thoughts-to-supabase.js
```

## Step 11: Test Your Setup

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Go to http://localhost:3000/thoughts

3. Try posting a new thought

4. Check your Supabase dashboard → Table Editor → thoughts table to see the data

## Verify Real-time Updates

1. Open http://localhost:3000/thoughts in two browser windows
2. Post a thought in one window
3. Watch it appear instantly in the other window (real-time!)

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has the correct values
- Restart your dev server after adding environment variables

### "Failed to fetch thoughts"
- Check your Supabase project is active
- Verify your API credentials are correct
- Check browser console for detailed errors

### Migration fails
- Make sure you're linked to the correct project: `supabase link --project-ref YOUR_REF`
- Check you have internet connection
- Verify CLI is logged in: `supabase login`

### Real-time not working
- Ensure Realtime is enabled in Supabase dashboard → Database → Replication
- Check browser console for connection errors
- Verify your anon key has correct permissions

## Next Steps

Once everything is working:

1. **Add moderation**: Update the `approved` field to `false` by default and create an admin panel
2. **Add rate limiting**: Prevent spam by limiting posts per IP/user
3. **Add reactions**: Let users react to thoughts
4. **Add filtering**: Filter by date, popularity, etc.
5. **Add search**: Full-text search across thoughts

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
