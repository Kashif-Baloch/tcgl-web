import { NextResponse } from "next/server";
import { Twilio } from "twilio";

export async function POST(request: Request) {
    try {
        const { phoneNumber } = await request.json();
        const accountSid = process.env.TWILIO_ACCOUNT_SID!;
        const authToken = process.env.TWILIO_AUTH_TOKEN!;
        const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

        const client = new Twilio(accountSid, authToken)

        const verification = await client.verify.v2.services(verifyServiceSid)
            .verifications
            .create({ to: phoneNumber, channel: 'sms' });

        return NextResponse.json({ success: true, message: 'OTP sent successfully!', sid: verification.sid });
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error sending OTP:', err.message);
        }
        return NextResponse.json({ success: false, error: "internal server error" });
    }
}
