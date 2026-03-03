import { NextResponse } from "next/server";
import { upsertActiveCampaignContact, addActiveCampaignTag } from "@/lib/activecampaign";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, nombre, apellido, telefono } = body;

        if (!email) {
            return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
        }

        const data = {
            email,
            nombre: nombre || "",
            apellido: apellido || "",
            telefono: telefono || "",
        } as any;

        const ac_contact_id = await upsertActiveCampaignContact(data);
        if (ac_contact_id) {
            const nurtureTagId = process.env.ACTIVECAMPAIGN_NURTURE_TAG_ID || "1";
            await addActiveCampaignTag(ac_contact_id, nurtureTagId);
        }

        return NextResponse.json({ ok: true, message: "Added to nurturing list" }, { status: 200 });

    } catch (error: any) {
        console.error("Nurture API Error:", error.message);
        return NextResponse.json({ ok: false, error: "Internal Server Error" }, { status: 500 });
    }
}
