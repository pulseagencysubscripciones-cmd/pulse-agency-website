"use client";

import { Search, Layers, Rocket, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        number: "01",
        title: "Diagnóstico",
        icon: Search,
        color: "from-violet-500 to-purple-700",
        shadow: "rgba(139, 92, 246, 0.3)",
        description:
            "Analizamos tu situación actual, arquitectura de datos y cuellos de botella para identificar palancas de crecimiento no aprovechadas.",
    },
    {
        number: "02",
        title: "Arquitectura",
        icon: Layers,
        color: "from-purple-500 to-indigo-700",
        shadow: "rgba(99, 102, 241, 0.3)",
        description:
            "Diseñamos un sistema end-to-end (ads, embudos, CRM, automatización) para eliminar la fricción en la captación y cualificación.",
    },
    {
        number: "03",
        title: "Implementación",
        icon: Rocket,
        color: "from-fuchsia-500 to-purple-700",
        shadow: "rgba(217, 70, 239, 0.3)",
        description:
            "Ejecutamos el despliegue técnico: integración de herramientas, configuración de medición y lanzamiento de campañas iniciales.",
    },
    {
        number: "04",
        title: "Optimización continua",
        icon: TrendingUp,
        color: "from-violet-400 to-purple-600",
        shadow: "rgba(167, 139, 250, 0.3)",
        description:
            "Iteramos basándonos en datos empíricos. Aplicamos IA para optimizar la conversión, reduciendo el CAC y aumentando el LTV.",
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden section-divider">
            {/* Background */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="container-pulse relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 mb-4 block">
                        Nuestra metodología
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white text-balance leading-[1.08] mb-6">
                        Un sistema, no una agencia{" "}
                        <span className="text-gradient-primary">tradicional</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        En 4 fases convertimos la incertidumbre en un motor predecible de adquisición y retención.
                    </p>
                </div>

                {/* Steps grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {steps.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={step.number}
                                className="group relative p-8 bg-zinc-950/50 border border-white/8 rounded-3xl hover:border-primary/40 transition-all duration-500 overflow-hidden"
                                style={{
                                    transitionDelay: `${i * 50}ms`,
                                }}
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                                    style={{
                                        boxShadow: `inset 0 0 60px ${step.shadow}`,
                                    }}
                                />

                                {/* Big background number */}
                                <div className="absolute top-4 right-4 text-7xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-all duration-500 select-none leading-none">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div
                                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                                >
                                    <Icon className="text-white w-5 h-5" strokeWidth={2} />
                                </div>

                                {/* Step number pill */}
                                <div className="text-[10px] font-black tracking-[0.2em] uppercase text-primary/60 mb-2">
                                    Paso {step.number}
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 leading-relaxed text-[14px]">
                                    {step.description}
                                </p>

                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-500 rounded-full" />
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href="/como-funciona"
                        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-semibold transition-colors group"
                    >
                        Ver la metodología completa
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
