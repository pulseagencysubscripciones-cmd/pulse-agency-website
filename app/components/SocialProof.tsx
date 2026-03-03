"use client";

import { Star } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

const testimonials = [
    {
        name: "Javier Mendez",
        role: "FOUNDER, MENDEZ REAL ESTATE",
        text: "\"Sistemas robustos y acompañamiento real. No son solo anuncios, es ingeniería de crecimiento para el mercado hispano en USA.\"",
        img: "/icons/avatar-javier.png",
        platform: "google"
    },
    {
        name: "Elena G.",
        role: "COO, LOGISTICS GLOBAL",
        text: "\"Buscábamos profesionalizar nuestra captación B2B y Pulse entregó un sistema automatizado que trabaja 24/7. Altamente recomendados.\"",
        img: "/icons/avatar-elena.png",
        platform: "trustpilot"
    },
    {
        name: "Roberto S.",
        role: "MD, HEALTHTECH USA",
        text: "\"Marketing con datos reales. Eliminaron la incertidumbre de nuestra inversión y ahora escalamos con bases sólidas e IA.\"",
        img: "/icons/avatar-roberto.png",
        platform: "google"
    }
];

export function SocialProof() {
    return (
        <section className="bg-black py-12 border-t border-white/5 overflow-hidden">
            <SectionWrapper className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8">
                        Empresas que confiaron <span className="text-primary italic">en nosotros</span>
                    </h2>

                    <div className="flex flex-wrap items-center justify-center gap-4 px-6">
                        <a
                            href="https://maps.app.goo.gl/5U2e1SfyftaeHp4e7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900/30 border border-white/5 py-3.5 px-8 rounded-full flex items-center gap-3 hover:bg-white/5 transition-all group backdrop-blur-sm"
                        >
                            <img src="/icons/google-g.svg" alt="Google" className="w-5 h-5" />
                            <span className="text-zinc-400 text-[10px] font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors">Google Reviews</span>
                        </a>
                        <a
                            href="https://www.trustpilot.com/review/pulseagencyusa.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900/30 border border-white/5 py-3.5 px-8 rounded-full flex items-center gap-3 hover:bg-white/5 transition-all group backdrop-blur-sm"
                        >
                            <img src="/icons/trustpilot-star.svg" alt="Trustpilot" className="w-5 h-5 trust-icon" />
                            <span className="text-zinc-400 text-[10px] font-black tracking-[0.2em] uppercase group-hover:text-white transition-colors">Trustpilot</span>
                        </a>
                    </div>
                </div>

                {/* Infinite Carousel */}
                <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw]">
                    <div className="animate-marquee flex gap-6 py-10">
                        {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                            <div key={i} className="inline-block w-[380px] bg-zinc-900/20 border border-white/5 p-10 rounded-[2rem] whitespace-normal flex flex-col gap-8 hover:border-primary/30 transition-all shrink-0 backdrop-blur-md relative group">
                                <div className="flex gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-zinc-300 italic text-lg leading-relaxed font-medium">
                                    {t.text}
                                </p>
                                <div className="flex items-center justify-between pt-8 mt-auto">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border border-white/10" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-white font-bold text-sm tracking-tight">{t.name}</h4>
                                            <p className="text-zinc-500 text-[9px] font-black tracking-widest uppercase mt-1">{t.role}</p>
                                        </div>
                                    </div>
                                    <div className="opacity-40 group-hover:opacity-100 transition-opacity">
                                        {t.platform === "google" ? (
                                            <img src="/icons/google-g.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Google" />
                                        ) : (
                                            <img src="/icons/trustpilot-star.svg" className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" alt="Trustpilot" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            <style jsx>{`
                .trust-icon {
                    filter: grayscale(1);
                    transition: all 0.3s ease;
                }
                .group:hover .trust-icon {
                    filter: grayscale(0);
                }
            `}</style>
        </section>
    );
}
