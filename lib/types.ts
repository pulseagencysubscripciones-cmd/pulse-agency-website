export type Tier = "SQL" | "MQL" | "LEAD";

export interface DiagnosticoPayload {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    empresa: string;
    web_o_instagram: string;
    pais: string;
    privacidad_check: boolean;
    whatsapp_optin: boolean;

    industria: string;
    ingresos_mensuales: string;
    presupuesto_marketing: string;
    objetivo_principal: string[];
    urgencia: string;
    interes_capital: "Sí" | "No";
    comentario?: string;

    origin_page?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    gclid?: string;
}

export interface ScoringResult {
    score: number;
    tier: Tier;
}

export interface HubSpotContactResponse {
    id: string;
    properties: Record<string, string>;
}
