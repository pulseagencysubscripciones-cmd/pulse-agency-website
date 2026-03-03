# Pulse Agency - Premium Corporate Site

Built on Next.js 16 (App Router), TailwindCSS v4, TypeScript, and integrated with HubSpot CRM & Twilio WhatsApp Messaging.

## Project Architecture

1. **Frontend:** React 19, Lucide React (icons), React Hook Form, Zod.
2. **Backend:** Next.js Route Handlers (`app/api/`).
3. **Integrations:**
   - **HubSpot CRM:** For Contact & Deal Upserts based on SQL tier.
   - **Twilio WhatsApp:** Scheduled 2 hours prior to HubSpot Meetings.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *Note: Edit `.env.local` and add your real HubSpot Private App Token and Twilio Credentials for integrations to function.*

3. **Configure HubSpot**
   Review `docs/hubspot-setup.md` for exact instructions on properties to create inside CRM to avoid API errors.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Site will be accessible at: [http://localhost:3000](http://localhost:3000)

## Lead Qualification Scoring

- SQL: Score >= 60 (Redirects to Meeting Scheduler)
- MQL: Score 30-59 (Redirects to Nurturing List)
- LEAD: Score <30 (Redirects to Nurturing List)

Scoring matrix runs entirely on the backend to avoid client-side manipulation. See `lib/scoring.ts` for exact logic implementation.
