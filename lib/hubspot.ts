import { Client } from "@hubspot/api-client";
import { DiagnosticoPayload, Tier } from "./types";

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN });

/**
 * Creates or updates a HubSpot Contact by Email.
 */
export async function upsertHubSpotContact(data: DiagnosticoPayload, score: number, tier: Tier) {
    // Map our payload to HubSpot internal property names
    const properties: any = {
        email: data.email,
        firstname: data.nombre,
        lastname: data.apellido,
        phone: data.telefono,
        company: data.empresa,
        website: data.web_o_instagram,
        country: data.pais,

        // Custom properties (created in HubSpot via API)
        lead_source: "premium_site_diagnostico",
        prequal_score: score,
        prequal_tier: tier,
        industry_segment: data.industria,
        monthly_revenue_range: data.ingresos_mensuales,
        monthly_budget_range: data.presupuesto_marketing,
        growth_goal: data.objetivo_principal.join(";"),
        urgency_range: data.urgencia,
        capital_interest: data.interes_capital === "Sí" ? "true" : "false",
        whatsapp_optin: data.whatsapp_optin ? "true" : "false",
        origin_page: data.origin_page || "",
        utm_source: data.utm_source || "",
        utm_medium: data.utm_medium || "",
        utm_campaign: data.utm_campaign || "",
        gclid: data.gclid || ""
    };

    try {
        const searchResponse = await hubspotClient.crm.contacts.basicApi.getById(
            data.email,
            ["email"],
            undefined,
            undefined,
            false,
            "email"
        );

        // If found, UPDATE it
        const contactId = searchResponse.id;
        await hubspotClient.crm.contacts.basicApi.update(contactId, { properties });
        return contactId;

    } catch (error: any) {
        if (error.code === 404 || (error.message && error.message.includes("404"))) {
            // 2. If not found (404), CREATE it
            const createResponse = await hubspotClient.crm.contacts.basicApi.create({ properties });
            return createResponse.id;
        }

        console.error("HubSpot Upsert Contact Error:", error.message);
        throw new Error("Failed to upsert contact in HubSpot.");
    }
}

/**
 * Creates a Deal in the configured Pipeline and Stage, assigned to Regional Owner.
 */
export async function createHubSpotDeal(contactId: string, companyName: string, pais: string) {
    try {
        const pipelineId = process.env.HUBSPOT_PIPELINE_ID_GROWTH;
        const stageId = process.env.HUBSPOT_STAGE_ID_PREQUAL;

        // Determine Owner Id by Country
        let ownerId = process.env.HUBSPOT_OWNER_ID_USA; // default

        const euCountries = ["España", "Spain", "Francia", "Alemania", "Italia", "Portugal", "UK", "Reino Unido"];
        const latamCountries = ["México", "Mexico", "Colombia", "Argentina", "Chile", "Perú", "Peru", "Ecuador"];

        if (euCountries.includes(pais)) {
            ownerId = process.env.HUBSPOT_OWNER_ID_EU || ownerId;
        } else if (latamCountries.includes(pais)) {
            ownerId = process.env.HUBSPOT_OWNER_ID_LATAM || ownerId;
        }

        const properties: any = {
            dealname: `${companyName} - Diagnóstico - SQL`,
            pipeline: pipelineId,
            dealstage: stageId,
        };

        if (ownerId) {
            properties.hubspot_owner_id = ownerId;
        }

        // Create the deal
        const dealResponse = await hubspotClient.crm.deals.basicApi.create({ properties });
        const dealId = dealResponse.id;

        const BasicApi = (hubspotClient.crm as any).associations?.v4?.basicApi;
        if (BasicApi) {
            await BasicApi.create(
                "deals",
                dealId,
                "contacts",
                contactId,
                [
                    {
                        associationCategory: "HUBSPOT_DEFINED",
                        associationTypeId: 3
                    }
                ]
            );
        }

        return dealId;
    } catch (error: any) {
        console.error("HubSpot Create Deal Error:", error.message);
        throw new Error("Failed to create deal in HubSpot.");
    }
}

/**
 * Updates a HubSpot contact found by email address with the given properties.
 * Used by the Calendly webhook to mark a lead as Hot Lead after booking.
 */
export async function updateHubSpotContactByEmail(email: string, properties: Record<string, string>) {
    const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
    const BASE = "https://api.hubapi.com/crm/v3/objects/contacts";

    try {
        // 1. Search for the contact by email
        const searchRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
                properties: ["email", "firstname"]
            })
        });

        const searchData = await searchRes.json();
        if (!searchData.results?.length) {
            console.warn(`updateHubSpotContactByEmail: No contact found for ${email}`);
            return null;
        }

        const contactId = searchData.results[0].id;

        // 2. PATCH the contact with new properties
        const updateRes = await fetch(`${BASE}/${contactId}`, {
            method: "PATCH",
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ properties })
        });

        if (!updateRes.ok) {
            const err = await updateRes.json();
            console.error("updateHubSpotContactByEmail PATCH error:", err);
            return null;
        }

        console.log(`✅ HubSpot contact ${contactId} updated as Hot Lead`);
        return contactId;

    } catch (error: any) {
        console.error("updateHubSpotContactByEmail error:", error.message);
        return null;
    }
}
