/**
 * Logic for lead and credit scoring calculations
 */

export type Tier = "SQL" | "MQL" | "LEAD";

export interface DiagnosticoData {
    ingresos_mensuales: string;
    urgencia: string;
    industria: string;
    objetivo_principal?: string[];
    whatsapp_optin?: boolean;
}

// ─────────────────────────────────────────────────────────────────
// Main site functions (Diagnostico funnel)
// ─────────────────────────────────────────────────────────────────

export function calculateScore(data: DiagnosticoData) {
    let score = 0;

    // Ingresos Mensuales
    if (data.ingresos_mensuales === "50k+") {
        score += 30;
    } else if (data.ingresos_mensuales === "20k-50k") {
        score += 20;
    } else if (data.ingresos_mensuales === "5k-20k") {
        score += 10;
    } else {
        score += 5;
    }

    // Urgencia
    if (data.urgencia === "ASAP") {
        score += 15;
    } else if (data.urgencia === "30 días") {
        score += 10;
    } else {
        score += 5;
    }

    // Industria Bonus
    const premiumIndustries = ["Construcción", "Servicios profesionales", "Real Estate", "Ecommerce"];
    if (premiumIndustries.includes(data.industria)) {
        score += 10;
    } else {
        score += 5;
    }

    // Objetivo Bonus
    if (data.objetivo_principal?.includes("Más clientes") || data.objetivo_principal?.includes("Automatizar procesos")) {
        score += 10;
    } else {
        score += 5;
    }

    // WhatsApp Opt-in
    if (data.whatsapp_optin) {
        score += 5;
    }

    // Determine Tier
    let tier: Tier = "LEAD";
    if (score >= 60) {
        tier = "SQL";
    } else if (score >= 30) {
        tier = "MQL";
    }

    return { score, tier };
}

// ─────────────────────────────────────────────────────────────────
// Credit portal functions (NET-30 portal)
// ─────────────────────────────────────────────────────────────────

export interface ScoringInput {
    income: number;
    debts: number;
    creditInquiries: number;
}

export function calculatePreliminaryScore(input: ScoringInput): number {
    // Simple dummy algorithm for MVP
    const base = 600;
    const incomeFactor = Math.min(input.income / 1000, 100);
    const debtFactor = Math.max(0, 100 - (input.debts / 500));

    return Math.round(base + incomeFactor + debtFactor - (input.creditInquiries * 5));
}
