"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SectionWrapper } from "../components/SectionWrapper";
import { Button } from "../components/Button";
import { Loader2 } from "lucide-react";

// The validation schema matches the required backend payload
const formSchema = z.object({
    nombre: z.string().min(2, "Requerido"),
    apellido: z.string().min(2, "Requerido"),
    email: z.string().email("Email inválido"),
    telefono: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Formato inválido (ej: +123456789)"),
    empresa: z.string().min(2, "Requerido"),
    web_o_instagram: z.string().min(3, "Requerido"),
    pais: z.string().min(2, "Requerido"),
    privacidad_check: z.literal(true, {
        message: "Debes aceptar la política de privacidad"
    }),
    whatsapp_optin: z.boolean(),

    // Scoring Fields
    industria: z.string().min(1, "Selecciona una industria"),
    ingresos_mensuales: z.string().min(1, "Selecciona un rango"),
    presupuesto_marketing: z.string().min(1, "Selecciona un rango"),
    objetivo_principal: z.array(z.string()).min(1, "Selecciona al menos uno").max(2, "Máximo 2 opciones"),
    urgencia: z.string().min(1, "Selecciona la urgencia"),
    interes_capital: z.enum(["Sí", "No"], { message: "Requerido" }),
    comentario: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

export default function DiagnosticoForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            whatsapp_optin: false,
            objetivo_principal: ["Más clientes"],
            industria: "Servicios profesionales",
            urgencia: "ASAP",
            interes_capital: "No",
            apellido: "N/A",
            empresa: "N/A",
            pais: "N/A",
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setErrorMsg("");

        try {
            const payload = {
                ...data,
                origin_page: window.location.href,
                utm_source: searchParams.get("utm_source") || undefined,
                utm_medium: searchParams.get("utm_medium") || undefined,
                utm_campaign: searchParams.get("utm_campaign") || undefined,
                gclid: searchParams.get("gclid") || undefined,
            };

            const res = await fetch("/api/diagnostico", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Ocurrió un error al procesar tu solicitud.");

            router.push(`/gracias-diagnostico?tier=${result.tier}`);

        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "Error de conexión. Intenta nuevamente.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-black py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white text-balance">
                        Solicita tu diagnóstico <br /> estratégico.
                    </h2>
                    <p className="text-[15px] md:text-[16px] text-zinc-400 max-w-xl mx-auto text-balance leading-relaxed">
                        Completa el formulario a continuación para evaluar si calificas para trabajar con nosotros.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-950/30 border border-white/5 p-6 md:p-10 rounded-[2rem] space-y-10 shadow-2xl backdrop-blur-sm">
                    {errorMsg && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-xs">
                            {errorMsg}
                        </div>
                    )}

                    {/* 1. Información Personal */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-2">1. Información Personal</h3>
                        <div className="w-full h-px bg-white/5 mb-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-black tracking-widest uppercase text-zinc-500">Nombre Completo *</label>
                                <input {...register("nombre")} className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-800" placeholder="" />
                                {errors.nombre && <p className="text-red-400 text-[10px] mt-1 uppercase font-bold">{errors.nombre.message}</p>}
                            </div>
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-black tracking-widest uppercase text-zinc-500">Web o Instagram *</label>
                                <input {...register("web_o_instagram")} className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-800" placeholder="" />
                                {errors.web_o_instagram && <p className="text-red-400 text-[10px] mt-1 uppercase font-bold">{errors.web_o_instagram.message}</p>}
                            </div>
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-black tracking-widest uppercase text-zinc-500">Email Corporativo *</label>
                                <input type="email" {...register("email")} className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-800" placeholder="" />
                                {errors.email && <p className="text-red-400 text-[10px] mt-1 uppercase font-bold">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-black tracking-widest uppercase text-zinc-500">Teléfono *</label>
                                <input type="tel" placeholder="+1234567890" {...register("telefono")} className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-zinc-800" />
                                {errors.telefono && <p className="text-red-400 text-[10px] mt-1 uppercase font-bold">{errors.telefono.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* 2. Sobre tu Crecimiento */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-2">2. Sobre tu Crecimiento</h3>
                        <div className="w-full h-px bg-white/5 mb-6" />

                        <div className="space-y-8">
                            <div className="space-y-2.5">
                                <label className="text-[11px] font-black tracking-widest uppercase text-zinc-500">Facturación Mensual Actual *</label>
                                <div className="relative group">
                                    <select {...register("ingresos_mensuales")} className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-zinc-400 focus:ring-1 focus:ring-primary outline-none cursor-pointer appearance-none transition-all hover:bg-zinc-900/50">
                                        <option value="" disabled hidden>Seleccionar...</option>
                                        <option value="<5k">Menos de $5,000 USD</option>
                                        <option value="5k-10k">$5,000 - $10,000 USD</option>
                                        <option value="10k-50k">$10,000 - $50,000 USD</option>
                                        <option value="50k-100k">$50,000 - $100,000 USD</option>
                                        <option value="100k+">Más de $100,000 USD</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                        <svg width="10" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </div>
                                </div>
                                {errors.ingresos_mensuales && <p className="text-red-400 text-[10px] mt-1 uppercase font-bold">{errors.ingresos_mensuales.message}</p>}
                            </div>

                            <div className="space-y-2.5">
                                <label className="text-[11px] font-black tracking-widest uppercase text-zinc-500 text-balance">Presupuesto Mensual Disponible *</label>
                                <div className="relative group">
                                    <select {...register("presupuesto_marketing")} className="w-full h-12 bg-black border border-white/10 rounded-xl px-4 text-sm text-zinc-400 focus:ring-1 focus:ring-primary outline-none cursor-pointer appearance-none transition-all hover:bg-zinc-900/50">
                                        <option value="" disabled hidden>Seleccionar...</option>
                                        <option value="<1k">Menos de $1,000 USD</option>
                                        <option value="1k-3k">$1,000 - $3,000 USD</option>
                                        <option value="3k-10k">$3,000 - $10,000 USD</option>
                                        <option value="10k-30k">$10,000 - $30,000 USD</option>
                                        <option value="30k+">Más de $30,000 USD</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                        <svg width="10" height="6" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                    </div>
                                </div>
                                {errors.presupuesto_marketing && <p className="text-red-400 text-[10px] mt-1 uppercase font-bold">{errors.presupuesto_marketing.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 pt-6">
                        <div className="flex flex-col gap-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" {...register("privacidad_check")} className="mt-1 w-4 h-4 text-primary bg-black border-white/20 rounded focus:ring-primary focus:ring-offset-0 transition-all cursor-pointer" />
                                <span className="text-[13px] text-zinc-400 group-hover:text-zinc-300 transition-colors leading-snug">
                                    He leído y acepto la <a href="/legal/privacy" target="_blank" className="text-primary hover:underline font-medium">Política de Privacidad</a>. *
                                </span>
                            </label>
                            {errors.privacidad_check && <p className="text-red-400 text-[10px] ml-7 uppercase font-bold">{errors.privacidad_check.message}</p>}

                            <label className="flex items-start gap-4 cursor-pointer group bg-zinc-900/40 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-all border-dashed">
                                <input type="checkbox" {...register("whatsapp_optin")} className="mt-1 w-4 h-4 text-green-500 bg-black border-white/20 rounded accent-green-500 transition-all cursor-pointer" />
                                <span className="text-[13px] text-zinc-300 leading-snug">
                                    Acepto recibir recordatorios y comunicaciones estratégicas por WhatsApp. <span className="text-zinc-500 font-medium">(Recomendado)</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full h-14 text-base font-black bg-primary text-white uppercase tracking-tighter hover:scale-[1.01] transition-all shadow-[0_0_30px_rgba(124,58,237,0.4)] disabled:opacity-50" disabled={isSubmitting}>
                            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Evaluar solicitud"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
