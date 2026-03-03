import { NextResponse } from "next/server";

export async function GET() {
    // Skeleton implementation for polling fallback
    return NextResponse.json({
        ok: true,
        message: "Polling fallback logic unimplemented. Please use HubSpot webhooks if possible.",
    });
}
