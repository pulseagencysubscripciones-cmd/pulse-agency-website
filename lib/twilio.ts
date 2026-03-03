export async function sendWhatsAppNotification(to: string, body: string) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886"}`;

    if (!accountSid || !authToken) {
        console.warn("Twilio credentials missing. Skipping notification.");
        return;
    }

    try {
        const response = await fetch(
            `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
                },
                body: new URLSearchParams({
                    To: `whatsapp:${to}`,
                    From: from,
                    Body: body,
                }).toString(),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to send WhatsApp message");
        }

        return await response.json();
    } catch (error) {
        console.error("Twilio WhatsApp Error:", error);
    }
}

export async function scheduleWhatsAppMessage(to: string, sendAt: Date, message: string) {
    // Stub for future implementation
    console.log(`Scheduling WhatsApp message to ${to} at ${sendAt.toISOString()}: ${message}`);
    return { sid: "stub_sid" };
}
