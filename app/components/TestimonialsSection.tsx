"use client";

import { Star } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

const testimonials = [
    {
        name: "Javier Mendez",
        role: "Founder",
        company: "Mendez Real Estate",
        text: "Sistemas robustos y acompañamiento real. No son solo anuncios, es ingeniería de crecimiento para el mercado hispano en USA. En 3 meses triplicamos nuestro pipeline.",
        img: "/icons/avatar-javier.png",
        platform: "google",
        initials: "JM",
        color: "bg-violet-600",
        result: "+3x pipeline",
    },
    {
        name: "Elena G.",
        role: "COO",
        company: "Logistics Global",
        text: "Buscábamos profesionalizar nuestra captación B2B y Pulse entregó un sistema automatizado que trabaja 24/7. Altamente recomendados. Redujimos nuestro CAC en un 55%.",
        img: "/icons/avatar-elena.png",
        platform: "trustpilot",
        initials: "EG",
        color: "bg-purple-600",
        result: "-55% CAC",
    },
    {
        name: "Roberto S.",
        role: "Managing Director",
        company: "HealthTech USA",
        text: "Marketing con datos reales. Eliminaron la incertidumbre de nuestra inversión y ahora escalamos con bases sólidas e IA. El ROI superó todas nuestras expectativas.",
        img: "/icons/avatar-roberto.png",
        platform: "google",
        initials: "RS",
        color: "bg-indigo-600",
        result: "+280% ROI",
    },
    {
        name: "María B.",
        role: "CEO",
        company: "TechConsult MX",
        text: "Pulse transformó cómo entendemos el marketing B2B. Pasamos de gastar a invertir. Cada dólar tiene retorno medido y predecible. Increíble equipo.",
        img: "/icons/avatar-maria.png",
        platform: "google",
        initials: "MB",
        color: "bg-fuchsia-600",
        result: "+450% leads",
    },
    {
        name: "Carlos F.",
        role: "VP Marketing",
        company: "SaaS Latam",
        text: "Lo que más valoro es la transparencia. Dashboard en tiempo real, reportes honestos y un equipo que realmente entiende B2B. Llevamos 8 meses juntos y firmé contrato anual.",
        img: "/icons/avatar-carlos.png",
        platform: "trustpilot",
        initials: "CF",
        color: "bg-blue-600",
        result: "8 meses juntos",
    },
    {
        name: "Ana L.",
        role: "Founder",
        company: "Consult Pro",
        text: "Sin experiencia previa en digital, Pulse me construyó un sistema completo. En 60 días tenía leads cualificados entrando solos. El equipo es de otro nivel.",
        img: "/icons/avatar-ana.png",
        platform: "google",
        initials: "AL",
        color: "bg-emerald-600",
        result: "60 días de setup",
    },
];

export function TestimonialsSection() {
    return (
        <section className="bg-black py-24 border-t border-white/5 overflow-hidden">
            <SectionWrapper className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 mb-4 block">
                        Social proof
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-4 text-balance leading-[1.08]">
                        Empresas que{" "}
                        <span className="text-gradient-primary italic">confiaron en nosotros</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                        No prometemos resultados. Los documentamos.
                    </p>

                    {/* Review platform badges */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://maps.app.goo.gl/5U2e1SfyftaeHp4e7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all group"
                        >
                            <img src="/icons/google-g.svg" alt="Google" className="w-5 h-5" />
                            <div>
                                <div className="flex gap-0.5 mb-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-zinc-500 text-[10px] font-black tracking-[0.15em] uppercase group-hover:text-white transition-colors">
                                    4.9 · Google Reviews
                                </span>
                            </div>
                        </a>
                        <a
                            href="https://www.trustpilot.com/review/pulseagencyusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/8 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all group"
                        >
                            <img src="/icons/trustpilot-star.svg" alt="Trustpilot" className="w-5 h-5" />
                            <div>
                                <div className="flex gap-0.5 mb-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                                    ))}
                                </div>
                                <span className="text-zinc-500 text-[10px] font-black tracking-[0.15em] uppercase group-hover:text-white transition-colors">
                                    4.8 · Trustpilot
                                </span>
                            </div>
                        </a>
                    </div>
                </div>
            </SectionWrapper>

            {/* Infinite carousel */}
            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw]">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee flex gap-5 py-6">
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="inline-block w-[360px] bg-zinc-950/60 border border-white/8 p-7 rounded-[1.75rem] whitespace-normal flex flex-col gap-5 hover:border-primary/30 transition-all shrink-0 backdrop-blur-md relative group card-hover"
                        >
                            {/* Platform badge */}
                            <div className="absolute top-5 right-6 opacity-30 group-hover:opacity-80 transition-opacity">
                                {t.platform === "google" ? (
                                    <img src="/icons/google-g.svg" className="w-4 h-4" alt="Google" />
                                ) : (
                                    <img src="/icons/trustpilot-star.svg" className="w-4 h-4" alt="Trustpilot" />
                                )}
                            </div>

                            {/* Result badge */}
                            <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 w-fit">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                <span className="text-primary text-[10px] font-black tracking-wide">{t.result}</span>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-zinc-300 italic text-[14px] leading-relaxed font-medium flex-1">
                                &ldquo;{t.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-auto">
                                <div className={`w-10 h-10 rounded-full ${t.color} border-2 border-white/10 flex items-center justify-center shrink-0`}>
                                    <span className="text-white text-[10px] font-black">{t.initials}</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                    <p className="text-zinc-500 text-[10px] font-semibold tracking-wide mt-0.5">
                                        {t.role} · {t.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
