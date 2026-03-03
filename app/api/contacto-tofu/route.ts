import { NextResponse } from "next/server";
import * as z from "zod";

const tofuSchema = z.object({
    nombre: z.string().min(1, "Nombre requerido."),
    email: z.string().email("Email inválido."),
    empresa: z.string().min(1, "Empresa requerida."),
    mensaje: z.string().optional(),
});

const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL;
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY;
const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

// ActiveCampaign list ID for the TOFU nurturing sequence (Tue/Thu emails)
// Update this ID to match your actual AC list
const TOFU_LIST_ID = process.env.AC_TOFU_LIST_ID || "1";
// Tag ID for TOFU contacts in ActiveCampaign
const TOFU_TAG_ID = process.env.AC_TOFU_TAG_ID || "1";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = tofuSchema.parse(body);

        console.log(`[TOFU] New inbound contact: ${data.nombre} | ${data.email} | ${data.empresa}`);

        // ── 1. ActiveCampaign: create/sync contact + add to TOFU list + tag ──
        let acContactId: string | null = null;
        if (AC_API_URL && AC_API_KEY) {
            try {
                // Sync contact
                const acSync = await fetch(`${AC_API_URL}/api/3/contact/sync`, {
                    method: "POST",
                    headers: {
                        "Api-Token": AC_API_KEY,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contact: {
                            email: data.email,
                            firstName: data.nombre,
                            fieldValues: [
                                { field: "EMPRESA", value: data.empresa },
                            ],
                        },
                    }),
                });

                if (acSync.ok) {
                    const acData = await acSync.json();
                    acContactId = acData.contact?.id || null;
                    console.log(`[TOFU] AC contact synced. ID: ${acContactId}`);
                } else {
                    console.error("[TOFU] AC sync failed:", await acSync.text());
                }

                // Add to nurturing list
                if (acContactId) {
                    await fetch(`${AC_API_URL}/api/3/contactLists`, {
                        method: "POST",
                        headers: {
                            "Api-Token": AC_API_KEY,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contactList: {
                                list: TOFU_LIST_ID,
                                contact: acContactId,
                                status: "1", // subscribed
                            },
                        }),
                    });

                    // Add TOFU tag
                    await fetch(`${AC_API_URL}/api/3/contactTags`, {
                        method: "POST",
                        headers: {
                            "Api-Token": AC_API_KEY,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            contactTag: {
                                contact: acContactId,
                                tag: TOFU_TAG_ID,
                            },
                        }),
                    });

                    console.log(`[TOFU] AC: contact added to list ${TOFU_LIST_ID} + tag ${TOFU_TAG_ID}`);
                }
            } catch (acErr: any) {
                console.error("[TOFU] ActiveCampaign error:", acErr.message);
            }
        } else {
            console.warn("[TOFU] AC credentials missing – skipping.");
        }

        // ── 2. HubSpot: create/update contact as TOFU warm lead ──
        if (HUBSPOT_TOKEN) {
            try {
                const hsProperties = {
                    email: data.email,
                    firstname: data.nombre,
                    company: data.empresa,
                    lifecyclestage: "lead",
                    lead_source_detail: "contacto-tofu",
                    hs_lead_status: "NEW",
                };

                const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ properties: hsProperties }),
                });

                if (!createRes.ok) {
                    const createData = await createRes.json();
                    // If contact already exists, update it
                    if (createRes.status === 409 && createData.message?.includes("Contact already exists")) {
                        const existingId = createData.message.match(/Existing ID: ([0-9]+)/)?.[1];
                        if (existingId) {
                            await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
                                method: "PATCH",
                                headers: {
                                    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ properties: hsProperties }),
                            });
                            console.log(`[TOFU] HubSpot: updated existing contact ${existingId}`);
                        }
                    } else {
                        console.error("[TOFU] HubSpot create error:", JSON.stringify(createData));
                    }
                } else {
                    console.log("[TOFU] HubSpot: new contact created.");
                }
            } catch (hsErr: any) {
                console.error("[TOFU] HubSpot error:", hsErr.message);
            }
        } else {
            console.warn("[TOFU] HubSpot token missing – skipping.");
        }

        return NextResponse.json({ ok: true, message: "Lead TOFU registrado correctamente." });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ ok: false, errors: error.flatten().fieldErrors }, { status: 400 });
        }
        console.error("[TOFU] API Error:", error);
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
    }
}
