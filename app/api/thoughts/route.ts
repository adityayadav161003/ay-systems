import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createServerClient()
    
    const { data: thoughts, error } = await supabase
      .from('thoughts')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch thoughts' }, { status: 500 })
    }

    return NextResponse.json(thoughts || [])
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, name } = body

    if (!content || content.trim().length < 3) {
      return NextResponse.json({ error: 'Content too short (min 3 characters)' }, { status: 400 })
    }

    if (content.trim().length > 500) {
      return NextResponse.json({ error: 'Content too long (max 500 characters)' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: newThought, error } = await supabase
      .from('thoughts')
      .insert({
        content: content.trim(),
        name: name?.trim() || null,
        approved: true,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save thought' }, { status: 500 })
    }

    return NextResponse.json(newThought, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
