import { google } from "googleapis";
import { NextResponse } from "next/server";
import { upsertHubSpotContact, createHubSpotDeal } from "@/lib/hubspot";
import { sendWhatsAppNotification } from "@/lib/twilio";
import { upsertActiveCampaignContact, addActiveCampaignTag } from "@/lib/activecampaign";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, start_time, notes, lastName, phone, company, website, country, tier } = body;

        const clientID = process.env.GOOGLE_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
        const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

        if (!clientID || !clientSecret || !refreshToken) {
            return NextResponse.json({ error: "Google Calendar configuration missing" }, { status: 500 });
        }

        const oauth2Client = new google.auth.OAuth2(clientID, clientSecret);
        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const startTime = new Date(start_time);
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // 30 mins later

        const event = {
            summary: `Pulse Agency Strategic Call: ${name}`,
            description: notes || "Sesión de diagnóstico estratégico.",
            start: {
                dateTime: startTime.toISOString(),
            },
            end: {
                dateTime: endTime.toISOString(),
            },
            attendees: [{ email }],
            conferenceData: {
                createRequest: {
                    requestId: `pulse-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                },
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "email", minutes: 120 },
                ],
            },
        };

        const response = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: event,
            conferenceDataVersion: 1,
            sendUpdates: "all",
        });

        const meetLink = response.data.hangoutLink;

        // --- Integraciones Adicionales ---
        try {
            // 1. HubSpot Integration
            const contactIdHubSpot = await upsertHubSpotContact({
                nombre: name,
                apellido: lastName || "",
                email: email,
                telefono: phone || "",
                empresa: company || "",
                web_o_instagram: website || "",
                pais: country || "Desconocido",
                privacidad_check: true,
                whatsapp_optin: true,
                industria: "Desconocida",
                ingresos_mensuales: "Desconocido",
                presupuesto_marketing: "Desconocido",
                objetivo_principal: ["Sesión Estratégica"],
                urgencia: "Alta",
                interes_capital: "No"
            }, 50, tier || "LEAD");

            if (contactIdHubSpot) {
                await createHubSpotDeal(contactIdHubSpot, company || name, country || "Desconocido");
            }

            // 2. ActiveCampaign Integration (Nurturing TOFU)
            const acContactId = await upsertActiveCampaignContact({
                nombre: name,
                apellido: lastName || "",
                email: email,
                telefono: phone || "",
                empresa: company || "",
                web_o_instagram: website || "",
                pais: country || "Desconocido",
                privacidad_check: true,
                whatsapp_optin: true,
                industria: "Desconocida",
                ingresos_mensuales: "Desconocido",
                presupuesto_marketing: "Desconocido",
                objetivo_principal: ["Sesión Estratégica"],
                urgencia: "Alta",
                interes_capital: "No"
            });

            if (acContactId && process.env.ACTIVECAMPAIGN_TAG_ID_TOFU) {
                await addActiveCampaignTag(acContactId, process.env.ACTIVECAMPAIGN_TAG_ID_TOFU);
            }

            // 3. WhatsApp Notification (via Twilio)
            const agencyWhatsApp = process.env.AGENCY_WHATSAPP_NUMBER;
            if (agencyWhatsApp) {
                const message = `🚀 *Nueva Reserva en Pulse Agency*\n\n👤 *Nombre:* ${name}\n📧 *Email:* ${email}\n📅 *Fecha:* ${new Date(start_time).toLocaleString('en-US', { timeZone: 'America/New_York' })} (Miami)\n🔗 *Link Meet:* ${meetLink}\n✅ *CRM:* HubSpot & ActiveCampaign OK`;
                await sendWhatsAppNotification(agencyWhatsApp, message);
            }
        } catch (integrationError) {
            console.error("Integration Error:", integrationError);
        }

        return NextResponse.json({
            success: true,
            eventId: response.data.id,
            booking_url: response.data.htmlLink,
            meetLink: meetLink
        });

    } catch (error: any) {
        console.error("Google Booking Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
