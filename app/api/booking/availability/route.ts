import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date"); // YYYY-MM-DD
    const timezone = searchParams.get("tz") || "America/Argentina/Buenos_Aires";

    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    if (!clientID || !clientSecret || !refreshToken) {
        return NextResponse.json({ error: "Google Calendar configuration missing" }, { status: 500 });
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    try {
        const oauth2Client = new google.auth.OAuth2(clientID, clientSecret);
        oauth2Client.setCredentials({ refresh_token: refreshToken });
        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        // --- Miami Scarcity Logic ---
        // We force Miami Time (America/New_York) for availability logic
        const miamiTz = "America/New_York";

        // Define day range in Miami time (9:00 - 18:00)
        // We use Intl and Date objects carefully to ensure we query the correct UTC range
        const startOfMiamiDay = new Date(`${date}T09:00:00-05:00`); // Assuming Standard Time (-5), UTC will be +5h
        const endOfMiamiDay = new Date(`${date}T18:00:00-05:00`);

        const response = await calendar.freebusy.query({
            requestBody: {
                timeMin: startOfMiamiDay.toISOString(),
                timeMax: endOfMiamiDay.toISOString(),
                timeZone: miamiTz,
                items: [{ id: calendarId }],
            },
        });

        const busySlots = response.data.calendars?.[calendarId]?.busy || [];

        // Generate slots every 1.5 hours (90 mins)
        const allPossibleSlots = [];
        let current = new Date(startOfMiamiDay);
        const slotDuration = 90 * 60 * 1000; // 90 minutes (1.5h)

        while (current.getTime() + slotDuration <= endOfMiamiDay.getTime()) {
            const slotStart = current.getTime();
            const slotEnd = slotStart + slotDuration;

            const isBusy = busySlots.some((busy: any) => {
                const bStart = new Date(busy.start).getTime();
                const bEnd = new Date(busy.end).getTime();
                return (slotStart < bEnd && slotEnd > bStart);
            });

            // Prevent booking in the past
            if (!isBusy && slotStart > Date.now()) {
                allPossibleSlots.push(current.toISOString());
            }

            current = new Date(current.getTime() + slotDuration);
        }

        // --- Scarcity: Pick max 5 slots randomly but consistently for the same day ---
        // We use the date string as a seed for a simple stable shuffle
        const finalSlots = allPossibleSlots
            .sort(() => {
                const seed = parseInt(date.replace(/-/g, ''));
                return Math.sin(seed) > 0 ? 1 : -1;
            })
            .slice(0, 5)
            .sort();

        return NextResponse.json(
            { slots: finalSlots },
            {
                headers: {
                    'Cache-Control': 'no-store, max-age=0'
                }
            }
        );

    } catch (error: any) {
        console.error("Internal Server Error (Google Availability):", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
