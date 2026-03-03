export async function getCalendlyEventDetails(eventUri: string) {
    const CALENDLY_TOKEN = process.env.CALENDLY_API_TOKEN;
    if (!CALENDLY_TOKEN) {
        console.warn("Calendly API Token is missing. Cannot fetch event details.");
        return null;
    }

    try {
        const response = await fetch(eventUri, {
            headers: {
                "Authorization": `Bearer ${CALENDLY_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Calendly API Error:", errorData);
            return null;
        }

        const data = await response.json();
        return data.resource; // Contains start_time, location, name, etc.
    } catch (error: any) {
        console.error("Calendly API Fetch Error:", error.message);
        return null;
    }
}
