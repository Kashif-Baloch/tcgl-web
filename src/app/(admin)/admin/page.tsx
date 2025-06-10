import React from 'react'
import AdminDashboard from './client-side-page'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Page = async () => {
    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.get('admin_auth')?.value === 'true'
    if (!isAuthenticated) {
        return redirect("/login")
    }
    return (
        <>
            <AdminDashboard />
        </>
    )
}

export default Page
