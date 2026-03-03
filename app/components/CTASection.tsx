"use client";

import { ArrowRight, Shield, Clock, Users } from "lucide-react";

export function CTASection() {
    return (
        <section className="py-24 lg:py-32 relative overflow-hidden section-divider">
            {/* Background */}
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 100%)"
            }} />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="container-pulse relative z-10 text-center max-w-4xl mx-auto">
                {/* Urgency badge */}
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-8">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-amber-400/90">
                        Plazas limitadas · Solo 5 nuevos clientes por mes
                    </span>
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white text-balance leading-[1.05] mb-6">
                    ¿Listo para sistematizar{" "}
                    <br className="hidden md:block" />
                    tu{" "}
                    <span className="text-gradient-primary">crecimiento?</span>
                </h2>

                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    El diagnóstico es gratuito, confidencial y sin compromiso. En 45 minutos identificamos si hay
                    una oportunidad real para escalar tu negocio.
                </p>

                {/* Trust signals row */}
                <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
                    {[
                        { icon: Shield, text: "Sin compromiso de contrato" },
                        { icon: Clock, text: "Respuesta en 24 horas" },
                        { icon: Users, text: "Estratega senior asignado" },
                    ].map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-2 text-zinc-400 text-sm">
                            <Icon className="w-4 h-4 text-primary" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="#diagnostico"
                        className="btn-primary inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-white font-black text-lg tracking-tight group animate-pulse-glow"
                    >
                        Solicitar diagnóstico gratuito
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>

                <p className="text-zinc-600 text-[12px] mt-6">
                    Al solicitar el diagnóstico aceptas nuestra{" "}
                    <a href="/legal/privacy" className="text-zinc-500 hover:text-white transition-colors underline underline-offset-2">
                        política de privacidad
                    </a>
                    . No spam, nunca.
                </p>
            </div>
        </section>
    );
}
