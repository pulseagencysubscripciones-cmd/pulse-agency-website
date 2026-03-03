"use client";

import { VSLPlayer } from "./VSLPlayer";
import Link from "next/link";
import { ArrowRight, Users, TrendingUp, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 pb-20">
      {/* Background orbs */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-[-20%] w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-[-20%] w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-pulse relative z-10 w-full flex flex-col items-center text-center">
        {/* Badge */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/90">
            Growth Marketing & AI — B2B
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animation-delay-100 text-[2.4rem] md:text-[3.8rem] lg:text-[5rem] font-black tracking-tighter mb-6 leading-[1.05] max-w-5xl">
          <span className="block text-gradient-primary">
            Más Clientes de Alto Valor.
          </span>
          <span className="block text-white">Menos Incertidumbre.</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up animation-delay-200 text-[17px] md:text-[19px] text-zinc-400 text-balance max-w-2xl mb-10 leading-relaxed font-medium mx-auto">
          Sistemas predictivos de adquisición B2B que combinan{" "}
          <span className="text-white font-semibold">IA y Machine Learning</span>{" "}
          para convertir tu prospección en un motor de crecimiento{" "}
          <span className="text-white font-semibold">predecible y escalable.</span>
        </p>

        {/* Social proof bar */}
        <div className="animate-fade-in-up animation-delay-300 flex flex-wrap items-center justify-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {["bg-violet-500", "bg-purple-600", "bg-indigo-500", "bg-fuchsia-500"].map((c, i) => (
                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-black flex items-center justify-center`}>
                  <span className="text-white text-[8px] font-bold">
                    {["JM", "EG", "RS", "MB"][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-zinc-400 text-sm font-medium">+50 empresas escalando</span>
          </div>
          <div className="w-px h-4 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-zinc-400 text-sm font-medium ml-1">4.9 en Google & Trustpilot</span>
          </div>
          <div className="w-px h-4 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-zinc-400 text-sm font-medium">Aceptando nuevos clientes</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4 mb-14 w-full max-w-md sm:max-w-none justify-center">
          <a
            href="#diagnostico"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base tracking-tight group"
          >
            Solicitar diagnóstico gratuito
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/como-funciona"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-zinc-300 font-semibold text-base border border-white/10 hover:border-white/25 hover:text-white transition-all bg-white/[0.03] hover:bg-white/[0.06]"
          >
            Ver cómo funciona
          </Link>
        </div>

        {/* VSL Video */}
        <div className="animate-scale-in animation-delay-500 relative w-full max-w-4xl mx-auto">
          {/* Glow behind video */}
          <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-[2rem] scale-95 pointer-events-none" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.2)] border border-white/10">
            <VSLPlayer />
          </div>
          {/* Stats floating below video */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { value: "+300%", label: "ROI promedio" },
              { value: "45 días", label: "Primeros resultados" },
              { value: "24/7", label: "Sistema activo" },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass-panel-light rounded-2xl px-4 py-4 text-center card-hover border border-white/6"
              >
                <div className="text-xl md:text-2xl font-black text-primary stat-glow">{stat.value}</div>
                <div className="text-zinc-500 text-[11px] font-semibold uppercase tracking-[0.15em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
