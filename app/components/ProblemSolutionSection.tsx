"use client";

import { X, Check } from "lucide-react";

const problems = [
    "Invertir en publicidad y no saber qué funciona realmente",
    "Depender de referidos o del azar para conseguir clientes",
    "Hablar con prospectos que nunca van a comprarte",
    "Escalar sin un sistema que lo sostenga",
    "Reportes llenos de métricas que no mueven el negocio",
];

const solutions = [
    "Datos empíricos que guían cada decisión de inversión",
    "Sistema automatizado de captación que trabaja 24/7",
    "Leads pre-calificados por IA antes de llegar a ventas",
    "Infraestructura escalable construida para crecer contigo",
    "Dashboard en tiempo real con los KPIs que importan",
];

export function ProblemSolutionSection() {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-pulse relative z-10">
                {/* Section label */}
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 mb-4 block">
                        El diagnóstico del problema
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white text-balance leading-[1.08]">
                        ¿Tú negocio vive esto{" "}
                        <br className="hidden md:block" />
                        <span className="text-gradient-primary">cada mes?</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto mt-6 leading-relaxed">
                        La mayoría de empresas B2B gastan años atrapadas en los mismos ciclos.
                        Hay una salida sistémica.
                    </p>
                </div>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Problems column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center">
                                <X className="w-4 h-4 text-red-400" />
                            </div>
                            <h3 className="text-white font-bold tracking-tight text-lg">Sin un sistema, esto pasa:</h3>
                        </div>
                        {problems.map((problem, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 rounded-2xl border border-red-500/10 bg-red-500/5 hover:border-red-500/20 transition-all group"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                    <X className="w-3 h-3 text-red-400" />
                                </div>
                                <p className="text-zinc-400 text-[15px] leading-snug group-hover:text-zinc-300 transition-colors">
                                    {problem}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Solutions column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                <Check className="w-4 h-4 text-emerald-400" />
                            </div>
                            <h3 className="text-white font-bold tracking-tight text-lg">Con Pulse, esto es tu realidad:</h3>
                        </div>
                        {solutions.map((solution, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 rounded-2xl border border-primary/15 bg-primary/5 hover:border-primary/30 hover:bg-primary/8 transition-all group card-hover"
                                style={{ animationDelay: `${i * 80}ms` }}
                            >
                                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-3 h-3 text-primary" />
                                </div>
                                <p className="text-zinc-300 text-[15px] leading-snug group-hover:text-white transition-colors font-medium">
                                    {solution}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
