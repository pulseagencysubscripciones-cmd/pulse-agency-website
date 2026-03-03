import { DiagnosticoPayload } from "./types";

const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL;
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY;

/**
 * Creates or updates a contact in ActiveCampaign.
 * Return the contact ID.
 */
export async function upsertActiveCampaignContact(data: DiagnosticoPayload): Promise<string | null> {
    if (!AC_API_URL || !AC_API_KEY) {
        console.warn("ActiveCampaign credentials missing. Skipping ActiveCampaign integration.");
        return null;
    }

    try {
        const response = await fetch(`${AC_API_URL}/api/3/contact/sync`, {
            method: "POST",
            headers: {
                "Api-Token": AC_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contact: {
                    email: data.email,
                    firstName: data.nombre,
                    lastName: data.apellido,
                    phone: data.telefono,
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error(`ActiveCampaign Sync Error: ${errorData}`);
            return null; // Don't throw to prevent 500
        }

        const responseData = await response.json();
        return responseData.contact?.id || null;
    } catch (error: any) {
        console.error("ActiveCampaign Upsert Error:", error.message);
        return null;
    }
}

/**
 * Adds a specific tag to a contact to trigger nurturing workflows.
 */
export async function addActiveCampaignTag(contactId: string, tagId: string): Promise<boolean> {
    if (!AC_API_URL || !AC_API_KEY) {
        return false;
    }

    try {
        const response = await fetch(`${AC_API_URL}/api/3/contactTags`, {
            method: "POST",
            headers: {
                "Api-Token": AC_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contactTag: {
                    contact: contactId,
                    tag: tagId
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error(`ActiveCampaign Tag Error: ${errorData}`);
            return false;
        }

        return true;
    } catch (error: any) {
        console.error("ActiveCampaign Add Tag Error:", error.message);
        return false;
    }
}
