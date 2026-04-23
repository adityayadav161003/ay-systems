/**
 * Migration script to move existing thoughts from JSON file to Supabase
 * 
 * Usage:
 * 1. Make sure .env.local is configured with Supabase credentials
 * 2. Run: node scripts/migrate-thoughts-to-supabase.js
 */

const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrateThoughts() {
  console.log('🚀 Starting migration...\n')

  // Read existing thoughts
  const thoughtsFile = path.join(process.cwd(), 'data', 'thoughts.json')
  
  if (!fs.existsSync(thoughtsFile)) {
    console.log('ℹ️  No thoughts.json file found. Nothing to migrate.')
    return
  }

  const thoughtsData = fs.readFileSync(thoughtsFile, 'utf-8')
  const thoughts = JSON.parse(thoughtsData)

  if (thoughts.length === 0) {
    console.log('ℹ️  No thoughts to migrate.')
    return
  }

  console.log(`📊 Found ${thoughts.length} thoughts to migrate\n`)

  // Transform data to match Supabase schema
  const transformedThoughts = thoughts.map(thought => ({
    content: thought.content,
    name: thought.name || null,
    created_at: thought.createdAt,
    approved: thought.approved !== undefined ? thought.approved : true,
  }))

  // Insert into Supabase
  console.log('📤 Uploading to Supabase...')
  
  const { data, error } = await supabase
    .from('thoughts')
    .insert(transformedThoughts)
    .select()

  if (error) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }

  console.log(`✅ Successfully migrated ${data.length} thoughts!\n`)

  // Create backup of original file
  const backupFile = path.join(process.cwd(), 'data', `thoughts.json.backup.${Date.now()}`)
  fs.copyFileSync(thoughtsFile, backupFile)
  console.log(`💾 Backup created: ${backupFile}`)

  console.log('\n✨ Migration complete!')
  console.log('\nNext steps:')
  console.log('1. Verify data in Supabase dashboard')
  console.log('2. Test your app at http://localhost:3000/thoughts')
  console.log('3. Once verified, you can delete data/thoughts.json')
}

migrateThoughts().catch(console.error)
