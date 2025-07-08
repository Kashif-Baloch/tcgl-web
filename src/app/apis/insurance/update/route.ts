import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json();
        const users = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        });

        return NextResponse.json({ success: true, message: "user updated successfully" });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error updating user:', err.message);
        }
        return NextResponse.json({ success: false, error: "internal server error" });
    }
}
