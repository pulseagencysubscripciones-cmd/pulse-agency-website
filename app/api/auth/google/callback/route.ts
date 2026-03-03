import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback` : "http://localhost:3000/api/auth/google/callback"
    );

    try {
        const { tokens } = await oauth2Client.getToken(code);

        // This is what the user needs to save in GOOGLE_REFRESH_TOKEN
        return NextResponse.json({
            message: "Authentication successful!",
            refresh_token: tokens.refresh_token,
            hint: "Copy this refresh_token to your .env file as GOOGLE_REFRESH_TOKEN"
        });
    } catch (error: any) {
        console.error("Error exchanging code for tokens:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
