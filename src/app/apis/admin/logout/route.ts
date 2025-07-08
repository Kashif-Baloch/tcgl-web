// app/api/admin/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = await cookies()
    cookieStore.set("admin_auth", "")
    cookieStore.delete("admin_auth")
    return NextResponse.json({ success: true })
}