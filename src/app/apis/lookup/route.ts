import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const payloadData = await request.json()
        const { postcode } = payloadData
        const apiKey = 'LUMQ-9V9N-AKZV-ZPHR'; // ⚠️ Keep this server-side in production
        const endpoint = `https://webservices.data-8.co.uk/AddressCapture/GetFullAddress.json?key=${apiKey}`;

        const payload = {
            licence: 'WebClickFull',
            postcode: postcode,
            building: "",
            options: {
                ReturnResultCount: false,
                IncludeAliases: false
            }
        };
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data?.Status?.Success) {
            throw new Error(
                `API Error: ${data?.Status?.ErrorMessage || 'Unknown error'}`
            );
        }

        const results = data.Results

        return NextResponse.json(results);
    } catch (err) {
        if (err instanceof Error) {
            console.error('Postcode lookup failed:', err.message);
            return NextResponse.json({ error: true, message: err.message }, { status: 500 });
        }
    }

}
