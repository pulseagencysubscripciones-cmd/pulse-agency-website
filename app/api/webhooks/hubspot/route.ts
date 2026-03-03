import { NextResponse } from "next/server";
import { scheduleWhatsAppMessage } from "@/lib/twilio";
import { Client } from "@hubspot/api-client";

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN });

/**
 * HubSpot Webhook endpoint for meeting engagements.
 * We listen for 'meeting.created' or similar engagement events.
 */
export async function POST(req: Request) {
    try {
        const rawBody = await req.json();

        // Security: Verify HubSpot Webhook Signature in a real app
        // const signature = req.headers.get("x-hubspot-signature")

        // Assuming we receive an array of events
        if (!Array.isArray(rawBody)) return NextResponse.json({ ok: true });

        for (const event of rawBody) {
            if (event.subscriptionType === "engagement.creation" || event.subscriptionType === "meeting.creation") {
                const engagementId = event.objectId;

                // Skip if dummy token
                if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN || process.env.HUBSPOT_PRIVATE_APP_TOKEN === "dummy_token") {
                    continue;
                }

                try {
                    // Fetch engagement details
                    const engagementsApi = (hubspotClient.crm as any).engagements;
                    if (!engagementsApi) continue;
                    const engagement = await engagementsApi.meetings.basicApi.getById(engagementId);

                    if (engagement.properties && engagement.properties.hs_internal_meeting_url) {
                        // In v3, we need to find associated contact
                        // Just a skeleton of the logic requested
                        /*
                        const associations = await hubspotClient.crm.engagements.meetings.associationsApi.getAll(...)
                        const contactId = associations[0].toObjectId;
                        const contact = await hubspotClient.crm.contacts.basicApi.getById(contactId, ["phone", "whatsapp_optin", "firstname"]);
            
                        if (contact.properties.whatsapp_optin === "true" && contact.properties.phone) {
                           const startTime = new Date(engagement.properties.hs_meeting_start_time);
                           const sendAt = new Date(startTime.getTime() - 2 * 60 * 60 * 1000); // 2 hours before
                           const meetingLink = engagement.properties.hs_internal_meeting_url;
                           
                           const message = `Hola ${contact.properties.firstname}. Te recordamos tu diagnóstico estratégico hoy. Aquí el acceso: ${meetingLink}`;
            
                           await scheduleWhatsAppMessage(contact.properties.phone, sendAt, message);
                           
                           // Log to timeline
                           // await addTimelineNote(contactId, "Scheduled WhatsApp reminder");
                        }
                        */
                        console.log("Processed meeting engagement:", engagementId);
                    }

                } catch (e: any) {
                    console.error(`Failed processing hook event ${engagementId}:`, e.message);
                }
            }
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error: any) {
        console.error("HubSpot Webhook API Error:", error.message);
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
    }
}
