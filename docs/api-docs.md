# API Documentation

## 1. POST `/api/diagnostico`
The main funnel endpoint. Validates, scores, creates contacts/deals in HubSpot, and returns the tier logic to the frontend to handle the dynamic redirect.

**Payload Expected (JSON):**
```json
{
  "nombre": "Jane",
  "apellido": "Doe",
  "email": "jane@empresa.com",
  "telefono": "+1234567890",
  "empresa": "TechCorp",
  "web_o_instagram": "techcorp.com",
  "pais": "USA",
  "privacidad_check": true,
  "whatsapp_optin": true,
  "industria": "Consultoría",
  "ingresos_mensuales": "50k+",
  "presupuesto_marketing": "5k+",
  "objetivo_principal": ["Más clientes", "Automatizar procesos"],
  "urgencia": "ASAP",
  "interes_capital": "Sí",
  "comentario": "",
  "origin_page": "https://...",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "search_tier1",
  "gclid": "12345"
}
```

**Response (200 OK):**
```json
{
  "ok": true,
  "tier": "SQL", // "SQL", "MQL", or "LEAD"
  "score": 95,
  "hubspot_contact_id": "123456",
  "hubspot_deal_id": "789012"
}
```

---

## 2. POST `/api/nurture`
Triggered when an MQL or LEAD clicks "Recibir recursos" on the Thank You page.

**Payload Expected:** Optional (email can be pulled from cookie/session in a real implementation).
**Response:** `{"ok": true, "message": "Added to nurturing list"}`

---

## 3. POST `/api/webhooks/hubspot`
Used purely for server-to-server communication from HubSpot's backend down to our application to trigger WhatsApp sending via Twilio.

**Payload:** HubSpot standard Webhook Event Array.

**Logic Executed:**
1. Listens for Meeting Creation.
2. Identifies associated Contact.
3. If `whatsapp_optin == "true"`:
4. Calculates `sendAt = meeting_time - 2 hours`.
5. Hits Twilio Message Scheduling API to queue the WhatsApp alert natively on Twilio's infrastructure.
