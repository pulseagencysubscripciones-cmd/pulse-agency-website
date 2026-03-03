import { Client } from '@hubspot/api-client'

export const hubspot = new Client({
    accessToken: process.env.HUBSPOT_PRIVATE_APP_TOKEN || '',
})

// ─────────────────────────────────────────────────────────────────
// Main site functions (Diagnostico funnel)
// ─────────────────────────────────────────────────────────────────

export async function upsertHubSpotContact(data: Record<string, unknown>, score: number, tier: string): Promise<string> {
    const properties: Record<string, string> = {
        email: data.email as string,
        firstname: data.nombre as string,
        lastname: (data.apellido as string) ?? 'N/A',
        phone: data.telefono as string,
        company: (data.empresa as string) ?? 'N/A',
        website: data.web_o_instagram as string,
        country: (data.pais as string) ?? 'N/A',
        prequal_score: String(score),
        prequal_tier: tier,
        industry_segment: data.industria as string,
        monthly_revenue_range: data.ingresos_mensuales as string,
        monthly_budget_range: data.presupuesto_marketing as string,
        urgency_range: data.urgencia as string,
        capital_interest: data.interes_capital as string,
        whatsapp_optin: String(data.whatsapp_optin),
        lead_source: 'Diagnostico Web',
        origin_page: (data.origin_page as string) ?? '',
        utm_source: (data.utm_source as string) ?? '',
        utm_medium: (data.utm_medium as string) ?? '',
        utm_campaign: (data.utm_campaign as string) ?? '',
        gclid: (data.gclid as string) ?? '',
    }

    try {
        // Search for existing contact by email
        const searchResult = await hubspot.crm.contacts.searchApi.doSearch({
            filterGroups: [{
                filters: [{ propertyName: 'email', operator: 'EQ', value: data.email as string }]
            }],
            limit: 1,
            after: '0',
            properties: ['email'],
            sorts: [],
        })

        if (searchResult.results.length > 0) {
            // Update existing
            const contactId = searchResult.results[0].id
            await hubspot.crm.contacts.basicApi.update(contactId, { properties })
            return contactId
        } else {
            // Create new
            const response = await hubspot.crm.contacts.basicApi.create({ properties })
            return response.id
        }
    } catch (error) {
        console.error('HubSpot upsertContact Error:', error)
        throw error
    }
}

export async function createHubSpotDeal(contactId: string, company: string, country: string): Promise<string | undefined> {
    const pipelineId = process.env.HUBSPOT_PIPELINE_ID_GROWTH || 'default'
    const stageId = process.env.HUBSPOT_STAGE_ID_PREQUAL || 'appointmentscheduled'

    try {
        const deal = await hubspot.crm.deals.basicApi.create({
            properties: {
                dealname: `Pulse SQL: ${company} (${country})`,
                dealstage: stageId,
                pipeline: pipelineId,
                amount: '0',
            },
            associations: [
                {
                    to: { id: contactId },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    types: [{ associationCategory: 'HUBSPOT_DEFINED' as any, associationTypeId: 3 }]
                }
            ]
        })
        return deal.id
    } catch (error) {
        console.error('HubSpot createDeal Error:', error)
        throw error
    }
}

// ─────────────────────────────────────────────────────────────────
// Credit portal functions (NET-30 portal)
// ─────────────────────────────────────────────────────────────────

export interface HubSpotLead {
    email: string;
    firstName: string;
    lastName: string;
    score: number;
    income: number;
    debts: number;
}

export async function createHubSpotLead(lead: HubSpotLead) {
    if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
        console.warn('HubSpot integration skipped: No HUBSPOT_PRIVATE_APP_TOKEN provided.')
        return null
    }

    try {
        const contactResponse = await hubspot.crm.contacts.basicApi.create({
            properties: {
                email: lead.email,
                firstname: lead.firstName,
                lastname: lead.lastName,
                credit_score_estimate: lead.score.toString(),
                monthly_income: lead.income.toString(),
                monthly_debts: lead.debts.toString(),
            }
        })

        const pipelineId = process.env.HUBSPOT_DEFAULT_PIPELINE_ID || 'default'
        const stageId = process.env.HUBSPOT_DEFAULT_STAGE_ID || 'appointmentscheduled'

        await hubspot.crm.deals.basicApi.create({
            properties: {
                dealname: `Pulse Credit Lead: ${lead.firstName} ${lead.lastName}`,
                dealstage: stageId,
                pipeline: pipelineId,
                amount: '0',
            },
            associations: [
                {
                    to: { id: contactResponse.id },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    types: [{ associationCategory: 'HUBSPOT_DEFINED' as any, associationTypeId: 3 }]
                }
            ]
        })

        return contactResponse
    } catch (error) {
        console.error('HubSpot Integration Error:', error)
        throw error
    }
}
