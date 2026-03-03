"use client";

import { SectionWrapper } from "../components/SectionWrapper";
import { Button } from "../components/Button";
import Link from "next/link";
import { Mail, MapPin, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

// ─── TOFU Form (Para potenciales clientes) ──────────────────────────────────

function TOFUForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get("nombre") as string,
            email: formData.get("email") as string,
            empresa: formData.get("empresa") as string,
            mensaje: formData.get("mensaje") as string,
        };

        try {
            const res = await fetch("/api/contacto-tofu", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Error al enviar");
            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="text-center py-12 px-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                    <Zap className="text-green-400 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">¡Recibido!</h3>
                <p className="text-zinc-400">
                    En breve recibirás contenido de valor y te contactaremos con más información.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-xs font-black tracking-widest uppercase text-zinc-500">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        required
                        placeholder="Jane Doe"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700 text-sm"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black tracking-widest uppercase text-zinc-500">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="jane@empresa.com"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700 text-sm"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black tracking-widest uppercase text-zinc-500">Empresa</label>
                <input
                    type="text"
                    name="empresa"
                    required
                    placeholder="Nombre de tu empresa"
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700 text-sm"
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black tracking-widest uppercase text-zinc-500">Mensaje breve (opcional)</label>
                <textarea
                    name="mensaje"
                    placeholder="¿En qué puedo ayudarte?"
                    rows={3}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700 text-sm resize-none"
                />
            </div>
            <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-12 text-base font-bold bg-primary text-white rounded-xl hover:scale-[1.01] transition-all shadow-[0_0_25px_rgba(124,58,237,0.25)] disabled:opacity-50"
            >
                {status === "loading" ? "Enviando..." : "Quiero más información"}
            </Button>
            {status === "error" && (
                <p className="text-center text-red-400 text-sm font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                    Hubo un error. Intenta de nuevo más tarde.
                </p>
            )}
        </form>
    );
}

// ─── General Contact Form ────────────────────────────────────────────────────

function GeneralContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            nombre: formData.get("nombre") as string,
            email: formData.get("email") as string,
            asunto: formData.get("asunto") as string,
            mensaje: formData.get("mensaje") as string,
        };

        try {
            const res = await fetch("/api/contacto", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Failed to submit");
            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch {
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="text-xs font-black tracking-widest uppercase text-zinc-500 ml-1">Nombre completo</label>
                    <input
                        type="text"
                        name="nombre"
                        required
                        placeholder="Jane Doe"
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-black tracking-widest uppercase text-zinc-500 ml-1">Email corporativo</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="jane@empresa.com"
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-700"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-black tracking-widest uppercase text-zinc-500 ml-1">Asunto</label>
                <div className="relative group">
                    <select
                        name="asunto"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all appearance-none cursor-pointer placeholder:text-zinc-700"
                    >
                        <option value="" disabled>Selecciona una opción</option>
                        <option value="Consultas generales">Consultas generales</option>
                        <option value="Alianzas estratégicas">Alianzas estratégicas</option>
                        <option value="Soporte">Soporte</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-primary transition-colors">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-black tracking-widest uppercase text-zinc-500 ml-1">Mensaje</label>
                <textarea
                    name="mensaje"
                    required
                    placeholder="¿Cómo podemos ayudarte?"
                    className="w-full bg-black/50 border border-white/10 rounded-3xl px-6 py-5 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all h-48 resize-none placeholder:text-zinc-700"
                />
            </div>

            <div className="pt-4">
                <Button
                    disabled={status === "loading"}
                    className="w-full h-16 text-lg font-black bg-primary text-white uppercase tracking-widest hover:scale-[1.01] transition-all shadow-[0_0_30px_rgba(124,58,237,0.3)] disabled:opacity-50 rounded-2xl"
                >
                    {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </Button>

                {status === "success" && (
                    <p className="mt-6 text-center text-green-400 font-bold text-sm bg-green-500/10 py-3 rounded-xl border border-green-500/20">
                        ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.
                    </p>
                )}
                {status === "error" && (
                    <p className="mt-6 text-center text-red-400 font-bold text-sm bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                        Hubo un error al enviar tu mensaje. Intenta de nuevo más tarde.
                    </p>
                )}
            </div>
        </form>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ContactoPage() {
    return (
        <div className="bg-black text-white min-h-screen py-12">
            <SectionWrapper className="max-w-3xl mx-auto px-6">

                {/* ── Header ────────────────────────────────────────────────── */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-primary/90">
                            Contacto
                        </span>
                    </div>
                    <h1 className="text-[2.4rem] md:text-[3.8rem] font-black tracking-tighter mb-6 leading-[1.05]">
                        <span className="block text-white">Ponte en</span>
                        <span className="block text-gradient-primary">contacto.</span>
                    </h1>
                    <p className="text-zinc-400 text-[17px] max-w-xl mx-auto font-medium leading-relaxed">
                        Alianzas estratégicas, soporte técnico o consultas generales.
                    </p>
                </div>

                {/* ── General Contact Form ──────────────────────────────────── */}
                <div className="bg-zinc-950/60 border border-white/8 rounded-[2.5rem] p-8 md:p-14 backdrop-blur-xl shadow-2xl mb-12">
                    <GeneralContactForm />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start p-7 bg-zinc-950/40 border border-white/8 rounded-3xl hover:border-primary/20 transition-all">
                        <Mail className="text-primary mb-4" size={22} />
                        <h4 className="font-bold text-white mb-1">Email de soporte</h4>
                        <p className="text-zinc-400 text-sm">support@pulseagencyusa.com</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start p-7 bg-zinc-950/40 border border-white/8 rounded-3xl hover:border-primary/20 transition-all">
                        <MapPin className="text-primary mb-4" size={22} />
                        <h4 className="font-bold text-white mb-1">HQ Global</h4>
                        <p className="text-zinc-400 text-sm">Operamos desde USA para el mercado Hispano.</p>
                    </div>
                </div>

            </SectionWrapper>
        </div>
    );
}
