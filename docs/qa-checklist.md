# QA Checklist

Before launching, please verify the following items are functioning correctly:

## 1. Frontend: `/diagnostico`
- [ ] All inputs require values before submission (except comments).
- [ ] "Web o Instagram" accepts a valid value.
- [ ] Maximum 2 options selectable in "Objetivo Principal".
- [ ] Checkbox "He leído y acepto la Política de Privacidad" strictly required.
- [ ] Submit button text changes to "Evaluando perfil..." during submission.

## 2. API & Scoring Logic: `/api/diagnostico`
*Simulate submissions matching the following profiles:*

**Profile A (SQL Expected):**
- Presupuesto: `$5k+` (30 pts)
- Ingresos: `+$50k` (20 pts)
- Urgencia: `Lo antes posible (ASAP)` (15 pts)
- Industria: `Ecommerce` (10 pts)
- Objetivo: `Más clientes`, `Automatizar procesos` (10 pts)
- WhatsApp Opt-in: `Checked` (5 pts)
- **Result:** Score = 90 (SQL). Redirects to `/gracias-diagnostico?tier=SQL`. Shows HubSpot Meetings embed.

**Profile B (MQL Expected):**
- Presupuesto: `$500 - $2k` (15 pts)
- Ingresos: `$5k - $20k` (10 pts)
- Urgencia: `30 días` (10 pts)
- Industria: `Otro` (5 pts)
- Objetivo: `Branding` (5 pts)
- WhatsApp Opt-in: `Unchecked` (0 pts)
- **Result:** Score = 45 (MQL). Redirects to `/gracias-diagnostico?tier=MQL`. Shows Nurturing block without embed.

**Profile C (LEAD Expected):**
- Presupuesto: `<$500` (5 pts)
- Ingresos: `<$5k` (5 pts)
- Urgencia: `90 días` (5 pts)
- **Result:** Score = <30 (LEAD). Redirects to `/gracias-diagnostico?tier=LEAD`. Shows Nurturing block without embed.

## 3. HubSpot CRM Integration
- [ ] Test form submission creates or updates a Contact in HubSpot.
- [ ] All custom properties (industry, revenue, opt_ins) correctly populate the Contact record.
- [ ] If SQL, a Deal is created automatically in Growth Sales Pipeline (Precalificado stage).
- [ ] Deal is correctly assigned to the Contact.
- [ ] Regional owner logic routes effectively if environmental variables are properly defined.

## 4. Twilio WhatsApp & Nurturing
- [ ] Book a test meeting as an SQL. Check that `webhook` logs the meeting capture and executes (requires real Webhook subscription inside HubSpot pointing to `/api/webhooks/hubspot`).
- [ ] Test click "Recibir recursos" as an MQL. Check `nurture` API logs.
