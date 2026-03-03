"use client";

import { SectionWrapper } from "../components/SectionWrapper";
import Link from "next/link";
import {
    Search, Layers, Rocket, TrendingUp,
    ArrowRight, CheckCircle, BarChart2,
    Cpu, Target, Shield, Zap, Users
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Diagnóstico",
        icon: Search,
        gradient: "from-violet-500 to-purple-700",
        glow: "rgba(139,92,246,0.25)",
        description:
            "Analizamos tu situación actual, arquitectura de datos y cuellos de botella para identificar palancas de crecimiento no aprovechadas.",
        bullets: [
            "Auditoría de canales y funnel actual",
            "Análisis de datos y métricas existentes",
            "Identificación de gaps y oportunidades",
        ],
        duration: "Semana 1",
    },
    {
        number: "02",
        title: "Arquitectura",
        icon: Layers,
        gradient: "from-purple-500 to-indigo-700",
        glow: "rgba(99,102,241,0.25)",
        description:
            "Diseñamos un sistema end-to-end (ads, embudos, CRM, automatización) para eliminar la fricción en la captación y cualificación.",
        bullets: [
            "Blueprint del sistema de adquisición",
            "Integración CRM + Automatización",
            "Diseño de embudos y landing pages",
        ],
        duration: "Semana 2–3",
    },
    {
        number: "03",
        title: "Implementación",
        icon: Rocket,
        gradient: "from-fuchsia-500 to-purple-700",
        glow: "rgba(217,70,239,0.25)",
        description:
            "Ejecutamos el despliegue técnico: integración de herramientas, configuración de medición y lanzamiento de campañas iniciales.",
        bullets: [
            "Setup técnico y trackeo avanzado",
            "Lanzamiento de campañas pagadas",
            "Activación del motor de IA y ML",
        ],
        duration: "Semana 3–6",
    },
    {
        number: "04",
        title: "Optimización",
        icon: TrendingUp,
        gradient: "from-violet-400 to-purple-600",
        glow: "rgba(167,139,250,0.25)",
        description:
            "Iteramos basándonos en datos empíricos. Aplicamos IA para optimizar la conversión, reduciendo el CAC y aumentando el LTV.",
        bullets: [
            "Análisis semanal de performance",
            "Pruebas A/B y optimización continua",
            "Reportes ejecutivos con KPIs reales",
        ],
        duration: "Mes 2 en adelante",
    },
];

const differentiators = [
    {
        icon: Cpu,
        title: "IA como núcleo operativo",
        description: "Nuestros modelos procesan miles de señales para predecir qué leads van a convertir antes de que tú los contactes.",
    },
    {
        icon: BarChart2,
        title: "Datos, no intuiciones",
        description: "Cada decisión está respaldada por métricas reales. Sin vanity metrics, sin excusas. Solo números que mueven el negocio.",
    },
    {
        icon: Target,
        title: "Sistema, no servicio puntual",
        description: "No hacemos campañas aisladas. Construimos infraestructura de crecimiento diseñada para operar y mejorar sola.",
    },
    {
        icon: Shield,
        title: "Transparencia total",
        description: "Tienes acceso a dashboards en tiempo real. Siempre sabes exactamente qué pasa con tu inversión.",
    },
    {
        icon: Zap,
        title: "Velocidad de ejecución",
        description: "Pasamos del diagnóstico al primer lead calificado en menos de 30 días. Sin burocracia, sin demoras.",
    },
    {
        icon: Users,
        title: "Equipo senior dedicado",
        description: "Un estratega senior, un especialista en datos y un ingeniero de sistemas asignados a tu cuenta.",
    },
];

export default function ComoFuncionaPage() {
    return (
        <div className="bg-black text-white min-h-screen">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                {/* Background orbs */}
                <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/8 blur-[130px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-[-15%] w-[400px] h-[400px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Subtle grid */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <SectionWrapper className="text-center relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/90">
                            Nuestra metodología operativa
                        </span>
                    </div>

                    <h1 className="text-[2.4rem] md:text-[3.8rem] lg:text-[5rem] font-black tracking-tighter mb-6 leading-[1.05] max-w-4xl mx-auto">
                        <span className="block text-gradient-primary">Un sistema, no</span>
                        <span className="block text-white">una agencia tradicional</span>
                    </h1>

                    <p className="text-zinc-400 text-[17px] md:text-[19px] max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                        En 4 fases transformamos la incertidumbre en un{" "}
                        <span className="text-white font-semibold">motor predecible</span> de
                        adquisición y retención para empresas B2B.
                    </p>

                    {/* Quick stats */}
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        {[
                            { value: "4 fases", label: "de implementación" },
                            { value: "30 días", label: "al primer lead calificado" },
                            { value: "24/7", label: "sistema activo" },
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl font-black text-primary">{s.value}</div>
                                <div className="text-zinc-500 text-[11px] uppercase tracking-widest font-bold mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            </section>

            {/* ── 4 STEPS ──────────────────────────────────────────────────── */}
            <section className="py-16 lg:py-24 border-t border-white/5">
                <SectionWrapper>
                    {/* Connecting line (desktop) */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

                    <div className="space-y-6">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isEven = i % 2 === 0;
                            return (
                                <div
                                    key={step.number}
                                    className={`flex flex-col lg:flex-row gap-0 items-stretch rounded-3xl overflow-hidden border border-white/8 hover:border-primary/25 transition-all duration-500 group`}
                                    style={{
                                        background: "rgba(9,9,11,0.7)",
                                    }}
                                >
                                    {/* Number column */}
                                    <div
                                        className={`lg:w-[200px] shrink-0 flex items-center justify-center p-10 relative overflow-hidden`}
                                        style={{
                                            background: `radial-gradient(circle at center, ${step.glow} 0%, transparent 70%)`,
                                        }}
                                    >
                                        <span className="text-7xl font-black text-white/5 group-hover:text-white/10 transition-all duration-500 select-none">
                                            {step.number}
                                        </span>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start border-l border-white/5">
                                        {/* Left: Icon + title + desc */}
                                        <div className="flex-1">
                                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon className="text-white w-5 h-5" strokeWidth={2} />
                                            </div>

                                            <div className="text-[10px] font-black tracking-[0.25em] uppercase text-primary/60 mb-2">
                                                {step.duration}
                                            </div>
                                            <h3 className="text-2xl font-black mb-3 text-white group-hover:text-primary transition-colors duration-300">
                                                {step.title}
                                            </h3>
                                            <p className="text-zinc-400 leading-relaxed text-[15px] max-w-md">
                                                {step.description}
                                            </p>
                                        </div>

                                        {/* Right: Bullets */}
                                        <div className="md:w-64 shrink-0 space-y-3">
                                            {step.bullets.map((b, j) => (
                                                <div key={j} className="flex items-start gap-3">
                                                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                                    <span className="text-zinc-300 text-[14px] leading-snug">{b}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionWrapper>
            </section>

            {/* ── DIFFERENTIATORS ──────────────────────────────────────────── */}
            <section className="py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 100%)"
                }} />

                <SectionWrapper className="relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 mb-4 block">
                            Por qué Pulse
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white text-balance leading-[1.08]">
                            Lo que nos hace{" "}
                            <span className="text-gradient-primary">diferentes</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {differentiators.map((d, i) => {
                            const Icon = d.icon;
                            return (
                                <div
                                    key={i}
                                    className="p-8 rounded-3xl border border-white/8 bg-zinc-950/50 hover:border-primary/30 transition-all duration-400 group card-hover"
                                >
                                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-white font-bold mb-2 text-base group-hover:text-primary transition-colors">
                                        {d.title}
                                    </h3>
                                    <p className="text-zinc-500 text-[14px] leading-relaxed">{d.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </SectionWrapper>
            </section>

            {/* ── FINAL CTA ────────────────────────────────────────────────── */}
            <section className="py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.10) 0%, transparent 100%)"
                }} />

                <SectionWrapper className="text-center relative z-10 max-w-3xl mx-auto">
                    {/* Urgency badge */}
                    <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-amber-400/90">
                            Solo 5 nuevos clientes por mes
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white text-balance leading-[1.05] mb-6">
                        ¿Listo para sistematizar{" "}
                        <span className="text-gradient-primary">tu crecimiento?</span>
                    </h2>

                    <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        El diagnóstico es gratuito. En 45 minutos identificamos si hay una oportunidad real para escalar tu negocio.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/#diagnostico"
                            className="btn-primary inline-flex items-center justify-center gap-2.5 px-10 py-5 rounded-2xl text-white font-black text-lg tracking-tight group"
                        >
                            Solicitar diagnóstico gratuito
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="https://capital.pulseagencyusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl text-zinc-300 font-semibold text-base border border-white/10 hover:border-white/25 hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.06]"
                        >
                            Crédito NET-30 →
                        </a>
                    </div>
                </SectionWrapper>
            </section>

        </div>
    );
}
