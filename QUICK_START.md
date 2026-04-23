# 🚀 Quick Start - Supabase Backend Setup

## Prerequisites Checklist
- [ ] Node.js installed
- [ ] Supabase account created at https://supabase.com
- [ ] New Supabase project created

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Supabase CLI
```bash
npm install -g supabase
```

### 3. Get Supabase Credentials
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### 4. Configure Environment
```bash
# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local and paste your credentials:
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 5. Setup Database
```bash
# Login to Supabase
supabase login

# Get your project ref from: Settings → General → Reference ID
supabase link --project-ref YOUR_PROJECT_REF

# Create the thoughts table
supabase db push

# Generate TypeScript types
supabase gen types typescript --linked > lib/supabase/database.types.ts
```

### 6. Migrate Existing Data (Optional)
```bash
# If you have existing thoughts in data/thoughts.json
npm install dotenv
node scripts/migrate-thoughts-to-supabase.js
```

### 7. Start Development Server
```bash
npm run dev
```

### 8. Test It Out!
1. Open http://localhost:3000/thoughts
2. Post a new thought
3. Open the same URL in another browser window
4. Watch the thought appear in real-time! ✨

## Verify Setup

### Check Database
1. Go to Supabase dashboard
2. Click **Table Editor**
3. Select `thoughts` table
4. You should see your data

### Check Real-time
1. Open http://localhost:3000/thoughts in 2 windows
2. Post a thought in one window
3. It should appear instantly in both windows

## Common Issues

### "Missing Supabase environment variables"
- Ensure `.env.local` exists in project root
- Restart dev server: `npm run dev`

### "Failed to push migration"
- Check you're logged in: `supabase login`
- Verify project link: `supabase projects list`
- Re-link if needed: `supabase link --project-ref YOUR_REF`

### Types not working
- Run: `supabase gen types typescript --linked > lib/supabase/database.types.ts`
- Restart TypeScript server in VS Code

## What Changed?

### Before (JSON File)
```
User → API Route → File System → thoughts.json
```

### After (Supabase)
```
User → API Route → Supabase → PostgreSQL Database
                      ↓
                Real-time Updates → All Users
```

## Next Steps

✅ **Working?** Great! Your thoughts are now stored in Supabase with real-time updates!

🎯 **Want More?**
- Add moderation (approve/reject thoughts)
- Add user authentication
- Add reactions/likes
- Add search functionality

📚 **Learn More:**
- Read `SUPABASE_MIGRATION_COMPLETE.md` for full details
- Check `scripts/setup-supabase.md` for troubleshooting
- Visit https://supabase.com/docs for Supabase docs

---

**Questions?** Check the detailed guides in this repo or visit Supabase docs!
