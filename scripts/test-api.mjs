async function test() {
    const token = process.env.CALENDLY_TOKEN;
    const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

    // Test with a future date
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const dateStr = date.toISOString().split('T')[0];

    const startTime = `${dateStr}T09:00:00Z`;
    const endTime = `${dateStr}T17:00:00Z`;
    const timezone = "America/Argentina/Buenos_Aires";

    const url = new URL("https://api.calendly.com/event_type_available_times");
    url.searchParams.append("event_type", eventTypeUri);
    url.searchParams.append("start_time", startTime);
    url.searchParams.append("end_time", endTime);
    url.searchParams.append("timezone", timezone);

    console.log("Testing URL:", url.toString());

    try {
        const response = await fetch(url.toString(), {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Data:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}

test();
