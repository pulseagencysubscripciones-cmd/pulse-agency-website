"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
    {
        value: 300,
        suffix: "%",
        prefix: "+",
        label: "ROI promedio documentado",
        description: "De los clientes que implementan el sistema completo",
        color: "text-primary",
    },
    {
        value: 45,
        suffix: " días",
        prefix: "",
        label: "Tiempo al primer resultado",
        description: "Desde la activación del sistema hasta optimizaciones visibles",
        color: "text-violet-400",
    },
    {
        value: 60,
        suffix: "%",
        prefix: "+",
        label: "Reducción de CAC",
        description: "Costo de adquisición reducido con IA vs marketing tradicional",
        color: "text-fuchsia-400",
    },
    {
        value: 50,
        suffix: "+",
        prefix: "",
        label: "Empresas B2B",
        description: "Escalando con nuestra metodología en EE.UU. y Latinoamérica",
        color: "text-indigo-400",
    },
];

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    let start = 0;
                    const duration = 2000;
                    const increment = value / (duration / 16);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= value) {
                            setCount(value);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, hasStarted]);

    return (
        <div ref={ref}>
            {prefix}{count}{suffix}
        </div>
    );
}

export function StatsSection() {
    return (
        <section className="py-24 relative overflow-hidden section-divider">
            {/* Background */}
            <div className="absolute inset-0 bg-zinc-950/40" />
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0" style={{
                background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 100%)"
            }} />

            <div className="container-pulse relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 mb-4 block">
                        Resultados reales
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white text-balance leading-[1.08]">
                        Los números que{" "}
                        <span className="text-gradient-primary">definen nuestro trabajo</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="group relative p-8 rounded-3xl border border-white/8 bg-zinc-950/50 hover:border-primary/30 transition-all duration-500 text-center overflow-hidden card-hover"
                        >
                            {/* Hover gradient */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
                            />

                            <div className={`text-4xl md:text-5xl font-black mb-3 ${stat.color} stat-glow`}>
                                <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                            </div>
                            <div className="text-white font-bold text-base mb-2">{stat.label}</div>
                            <div className="text-zinc-500 text-[12px] leading-snug">{stat.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
