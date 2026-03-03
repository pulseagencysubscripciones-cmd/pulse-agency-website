import { NextResponse } from "next/server";
import { calculateScore } from "@/lib/scoring";
import { upsertHubSpotContact, createHubSpotDeal } from "@/lib/hubspot";
import { upsertActiveCampaignContact, addActiveCampaignTag } from "@/lib/activecampaign";
import { sendWhatsAppNotification } from "@/lib/twilio";
import * as z from "zod";

// Zod schema for input validation
const diagnosticoSchema = z.object({
    nombre: z.string().min(1),
    apellido: z.string().optional().default("N/A"),
    email: z.string().email(),
    telefono: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    empresa: z.string().optional().default("N/A"),
    web_o_instagram: z.string().min(1),
    pais: z.string().optional().default("N/A"),
    privacidad_check: z.literal(true),
    whatsapp_optin: z.boolean().default(false),
    industria: z.string().min(1),
    ingresos_mensuales: z.string().min(1),
    presupuesto_marketing: z.string().min(1),
    objetivo_principal: z.array(z.string()).min(1).max(2),
    urgencia: z.string().min(1),
    interes_capital: z.enum(["Sí", "No"]),
    comentario: z.string().optional(),
    origin_page: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    gclid: z.string().optional()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Zod Validation
        const validation = diagnosticoSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ ok: false, error: "Validation failed", details: validation.error.format() }, { status: 400 });
        }

        const data = validation.data;

        // 2. Score Lead
        const { score, tier } = calculateScore(data);

        let hubspot_contact_id = "";
        let hubspot_deal_id;
        let ac_contact_id = null;

        // 3. Upsert HubSpot Contact
        // If HUBSPOT_PRIVATE_APP_TOKEN is missing or dummy, we skip actual API calls to prevent 500s during dev
        if (process.env.HUBSPOT_PRIVATE_APP_TOKEN && process.env.HUBSPOT_PRIVATE_APP_TOKEN !== "dummy_token") {
            try {
                hubspot_contact_id = await upsertHubSpotContact(data, score, tier);

                // 4. Create Deal (SQL ONLY)
                if (tier === "SQL" && hubspot_contact_id) {
                    hubspot_deal_id = await createHubSpotDeal(hubspot_contact_id, data.empresa, data.pais);
                }
            } catch (hsError: any) {
                console.error("HubSpot Error:", hsError);
                // We continue anyway so the user can be redirected on the frontend
            }
        } else {
            console.warn("HubSpot Token missing or dummy. Skipping CRM integration.");
            hubspot_contact_id = "mock_hs_id";
            if (tier === "SQL") hubspot_deal_id = "mock_deal_id";
        }

        // 5. ActiveCampaign Nurturing (MQL & LEAD ONLY)
        if (tier !== "SQL") {
            try {
                ac_contact_id = await upsertActiveCampaignContact(data);
                if (ac_contact_id) {
                    // Assign tag based on tier:
                    // LEAD (score < 30)  → TOFU-Nurture (ID 1)
                    // MQL  (score 30-59) → MQL-Nurture  (ID 2)
                    const tagId = tier === "MQL"
                        ? (process.env.ACTIVECAMPAIGN_MQL_TAG_ID || "2")
                        : (process.env.ACTIVECAMPAIGN_NURTURE_TAG_ID || "1");
                    await addActiveCampaignTag(ac_contact_id, tagId);
                }
            } catch (acError: any) {
                console.error("ActiveCampaign Error:", acError);
            }
        }

        // 5. Twilio WhatsApp Notification
        try {
            const messageBody = `🚀 *Nuevo Lead Pulse Agency*\n\n` +
                `👤 *Nombre:* ${data.nombre} ${data.apellido}\n` +
                `🏢 *Empresa:* ${data.empresa}\n` +
                `📧 *Email:* ${data.email}\n` +
                `📱 *WhatsApp:* ${data.telefono}\n` +
                `🌐 *Web:* ${data.web_o_instagram}\n` +
                `📊 *Tier:* ${tier}\n` +
                `📈 *Presupuesto:* ${data.presupuesto_marketing}`;

            await sendWhatsAppNotification(
                process.env.AGENCY_WHATSAPP_NUMBER || "+13073818506",
                messageBody
            );
        } catch (twilioError) {
            console.error("Twilio notification failed:", twilioError);
        }

        // 6. Response
        return NextResponse.json({
            ok: true,
            tier,
            score,
            hubspot_contact_id,
            hubspot_deal_id
        }, { status: 200 });

    } catch (error: any) {
        console.error("Diagnostico API Error:", error.message);
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
    }
}
