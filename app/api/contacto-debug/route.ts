import { NextResponse } from "next/server";
import { Client } from "@hubspot/api-client";

export async function GET() {
    try {
        const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN });

        const properties = {
            email: "testcontactoGET@pulseagencyusa.com",
            firstname: "GET Test",
        };

        const createResponse = await hubspotClient.crm.contacts.basicApi.create({ properties });

        return NextResponse.json({ ok: true, id: createResponse.id });
    } catch (error: any) {
        return NextResponse.json({
            ok: false,
            message: error.message,
            body: error.response?.body,
            stack: error.stack
        }, { status: 500 });
    }
}
