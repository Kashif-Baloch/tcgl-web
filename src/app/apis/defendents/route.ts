import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { type_uc } = await request.json()
        const tcglUrl = "https://r1rqj5sxlc.execute-api.eu-west-1.amazonaws.com/dev";
        const reqUrl = `${tcglUrl}/defendants`;
        const response = await fetch(reqUrl, {
            method: 'POST',
            headers: { 'x-api-key': "N4WIDCaIPSVnB8x7ebNV4XRoOsV4HEf9FXpWyOea" },
            body: JSON.stringify({ "productTypes": [type_uc] })
        });

        const body = await response.json();
        return NextResponse.json(body);
    } catch (err) {
        if (err instanceof Error) {
            console.error('Error fetching TCGL defendants:', err.message);
            return NextResponse.json({ error: true, message: err.message }, { status: 500 });
        }
    }
}