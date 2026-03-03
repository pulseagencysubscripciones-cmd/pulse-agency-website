import { NextResponse } from "next/server";
import { Client } from "@hubspot/api-client";
import * as z from "zod";


const contactoSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio."),
    email: z.string().email("Email inválido."),
    asunto: z.string().min(1, "Selecciona un asunto validó."),
    mensaje: z.string().min(1, "El mensaje no puede estar vacío.")
});

export async function POST(req: Request) {
    const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN as string });
    try {
        const body = await req.json();
        const data = contactoSchema.parse(body);

        // Map payload to HubSpot internal property names
        // Only mapping standard properties to avoid 400 Bad Request
        const properties = {
            email: data.email,
            firstname: data.nombre,
            // "message", "subject", "lead_source" are often custom properties.
            // If they don't exist in HubSpot, the API rejects the whole payload.
        };

        console.log(`Received contact form message from ${data.nombre} (${data.email}): Subject: ${data.asunto} | Message: ${data.mensaje}`);

        const HUBSPOT_API_URL = "https://api.hubapi.com/crm/v3/objects/contacts";
        const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

        console.log(`Sending to HubSpot using token: ${token?.substring(0, 10)}... (Length: ${token?.length || 0})`);

        // 1. Try to create contact directly
        const createRes = await fetch(HUBSPOT_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ properties })
        });

        if (!createRes.ok) {
            const createData = await createRes.json();

            // 2. If it already exists (409 Conflict), update it
            if (createRes.status === 409 && createData.message.includes("Contact already exists")) {
                const existingId = createData.message.match(/Existing ID: ([0-9]+)/)?.[1];

                if (existingId) {
                    const updateRes = await fetch(`${HUBSPOT_API_URL}/${existingId}`, {
                        method: "PATCH",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ properties })
                    });

                    if (!updateRes.ok) throw new Error("Failed to update existing HubSpot contact");
                }
            } else {
                console.error("HubSpot Create Error Data:", JSON.stringify(createData));
                throw new Error(`HubSpot API Error: ${createRes.statusText}`);
            }
        }

        return NextResponse.json({ ok: true, message: "Contact saved to HubSpot." });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { ok: false, errors: error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        console.error("Contacto API Error:", error);
        return NextResponse.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
