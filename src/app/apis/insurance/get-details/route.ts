import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        return NextResponse.json({ success: true, data: users });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error getting details:', err.message);
        }
        return NextResponse.json({ success: false, error: "internal server error" });
    }
}
