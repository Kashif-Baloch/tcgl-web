import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {
            postcode,
            selectedAddress,
            prefix,
            firstName,
            lastName,
            dateOfBirth,
            email,
            mobileNumber,
            selectedLenders,
            signature,
            termsAgreed,
            claimsAgreed,
            authoriseAgreed,
            otp,
            drivingLicenceFront,
            drivingLicenceBack
        } = await request.json();
        await prisma.user.create({
            data: {
                postcode,
                selectedAddress,
                prefix,
                firstName,
                lastName,
                dateOfBirth,
                email,
                mobileNumber,
                selectedLenders,
                signature,
                termsAgreed,
                claimsAgreed,
                authoriseAgreed,
                otp,
                drivingLicenceFront,
                drivingLicenceBack
            }
        });

        return NextResponse.json({ success: true, message: "success" });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error applying details:', err.message);
        }
        return NextResponse.json({ success: false, error: "internal server error" });
    }
}
