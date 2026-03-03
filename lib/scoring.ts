import { DiagnosticoPayload, ScoringResult, Tier } from "./types";

/**
 * Calculates the score based on the answers and determines the tier (SQL, MQL, LEAD)
 * 
 * SCORING RULES:
 * - Presupuesto: 5k+=30, 2k-5k=30, 500-2k=15, <500=5
 * - Ingresos: 50k+=20, 20k-50k=20, 5k-20k=10, <5k=5
 * - Urgencia: ASAP=15, 30 días=10, 90 días=5
 * - Industria bonus: Construcción/Servicios profesionales/Real Estate/Ecommerce=10, Otros=5
 * - Objetivo: Más clientes o Automatizar procesos=10, Otros=5
 * - WhatsApp opt-in: true=5
 * 
 * TIER RANGES:
 * - SQL: >= 60
 * - MQL: 30 - 59
 * - LEAD: < 30
 */
export function calculateScore(data: DiagnosticoPayload): ScoringResult {
    let score = 0;

    // Presupuesto
    if (data.presupuesto_marketing === "5k+" || data.presupuesto_marketing === "2k-5k") {
        score += 30;
    } else if (data.presupuesto_marketing === "500-2k") {
        score += 15;
    } else {
        score += 5;
    }

    // Ingresos
    if (data.ingresos_mensuales === "50k+" || data.ingresos_mensuales === "20k-50k") {
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
