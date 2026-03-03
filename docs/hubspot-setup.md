# HubSpot Configuration Checklist

This document details the exact setup required in your HubSpot portal to support the Pulse Agency CRM integration and the `/diagnostico` funnel.

## 1. Custom Contact Properties
Create these exactly with the internal names listed.

| Label (Visible) | Internal Name | Field Type | Options (if enum/select) |
|---|---|---|---|
| Lead Source | `lead_source` | Single-line text | - |
| Prequal Score | `prequal_score` | Number | - |
| Prequal Tier | `prequal_tier` | Dropdown select | SQL, MQL, LEAD |
| Industry Segment | `industry_segment` | Dropdown select | Construcción, Servicios profesionales, Real Estate, Ecommerce, Salud, Consultoría, Otro |
| Monthly Revenue Range | `monthly_revenue_range` | Dropdown select | `<5k`, `5k-20k`, `20k-50k`, `50k+` |
| Monthly Budget Range | `monthly_budget_range` | Dropdown select | `<500`, `500-2k`, `2k-5k`, `5k+` |
| Growth Goal | `growth_goal` | Multiple checkboxes | Más clientes, Automatizar procesos, Ordenar CRM, Branding, Escalar operaciones |
| Urgency | `urgency_range` | Dropdown select | ASAP, 30 días, 90 días |
| Capital Interest | `capital_interest` | Dropdown select | Sí, No |
| WhatsApp Opt-in | `whatsapp_optin` | Checkbox (Boolean) | true, false |
| Origin Page | `origin_page` | Single-line text | - |
| UTM Source | `utm_source` | Single-line text | - |
| UTM Medium | `utm_medium` | Single-line text | - |
| UTM Campaign | `utm_campaign` | Single-line text | - |
| GCLID | `gclid` | Single-line text | - |

---

## 2. Growth Sales Pipeline
Go to Sales > Deals > Pipelines > Create pipeline.

**Pipeline Name:** `Growth Sales`
**Stages:**
1. New Diagnóstico
2. Precalificado *(This is the default stage for the code: set `HUBSPOT_STAGE_ID_PREQUAL` to this stage ID)*
3. Call Scheduled
4. Call Completed
5. Proposal
6. Won
7. Lost

---

## 3. Workflows Automation

### Workflow 1: SQL Routing
* Trigger: Contact property `prequal_tier` is any of `SQL`
* Actions:
  * Check if contact is associated with a deal in Growth Sales. If not, the API has failed to create one, so you can add a "Create Record (Deal)" fallback here.
  * Send marketing email: "Agenda tu llamada" (containing the HubSpot Meetings link).
  * Create task: "Preparar sesión estratégica" for Contact Owner.

### Workflow 2: NO SQL (Nurturing TOFU)
* Trigger: Contact property `prequal_tier` is any of `MQL`, `LEAD` OR list membership = "TOFU Master"
* Actions:
  * Add to static list "TOFU Master".
  * Create branches based on `industry_segment` or `growth_goal`.
  * Send email Nurture #1 (Recursos básicos).
  * Delay 3 days.
  * Send email Nurture #2...

### Workflow 3: Post-Call Upsell Delay (WhatsApp)
* Trigger: Deal Stage in Growth Sales is updated to "Call Completed"
* Actions:
  * Delay 7 days.
  * Branch: Check if `whatsapp_optin` is `true`.
  * If true: Trigger webhook to `/api/webhooks/hubspot` to send a 7-day upsell message, OR use native integration if available.

---

## 4. HubSpot Meetings Link
* Create a Sales Scheduling Page.
* In settings, require only Email (since we already have the rest of the lead details from the form).
* Set `NEXT_PUBLIC_HUBSPOT_MEETINGS_LINK` in `.env.local` to this URL.

---

## 5. Webhooks Configuration (For WhatsApp 2-Hour Reminder)
* In your Private App config, go to "Webhooks".
* Target URL: `https://yourdomain.com/api/webhooks/hubspot`
* Set subscriptions for: `Meeting created` and `Meeting updated`.
* Note: Twilio WhatsApp requires the phone number in E.164 format, which the form handles automatically.
