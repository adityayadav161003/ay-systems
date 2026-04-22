import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const THOUGHTS_FILE = path.join(process.cwd(), 'data', 'thoughts.json')

function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(THOUGHTS_FILE)) {
    fs.writeFileSync(THOUGHTS_FILE, JSON.stringify([]))
  }
}

function getThoughts() {
  ensureDataDir()
  const data = fs.readFileSync(THOUGHTS_FILE, 'utf-8')
  return JSON.parse(data)
}

function saveThoughts(thoughts: any[]) {
  ensureDataDir()
  fs.writeFileSync(THOUGHTS_FILE, JSON.stringify(thoughts, null, 2))
}

export async function GET() {
  try {
    const thoughts = getThoughts()
    return NextResponse.json(thoughts.filter((t: any) => t.approved))
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, name } = body

    if (!content || content.trim().length < 3) {
      return NextResponse.json({ error: 'Content too short' }, { status: 400 })
    }

    if (content.trim().length > 500) {
      return NextResponse.json({ error: 'Content too long (max 500 characters)' }, { status: 400 })
    }

    const thoughts = getThoughts()
    const newThought = {
      id: Date.now().toString(),
      content: content.trim(),
      name: name?.trim() || null,
      createdAt: new Date().toISOString(),
      approved: true,
    }

    thoughts.unshift(newThought)
    saveThoughts(thoughts)

    return NextResponse.json(newThought, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save thought' }, { status: 500 })
  }
}
