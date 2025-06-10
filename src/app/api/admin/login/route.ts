// app/api/admin/login/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const cookieStore = await cookies()
    const { password } = await request.json()

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    if (password === process.env.ADMIN_PASSWORD!) {
        cookieStore.set('admin_auth', 'true', {
            secure: true
        })

        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
}