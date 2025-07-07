import { NextResponse } from "next/server";
import { Twilio } from "twilio";

export async function POST(request: Request) {
    try {
        const { phoneNumber, otpCode } = await request.json();
        const accountSid = process.env.TWILIO_ACCOUNT_SID!;
        const authToken = process.env.TWILIO_AUTH_TOKEN!;
        const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

        const client = new Twilio(accountSid, authToken)

        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({ to: phoneNumber, code: otpCode });

        if (verificationCheck.status === 'approved') {
            return NextResponse.json({ success: true, message: 'OTP verified successfully!' });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid OTP or phone number.' });
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error verifying OTP:', err.message);
        }
        return NextResponse.json({ success: false, error: "internal server error" });
    }
}
