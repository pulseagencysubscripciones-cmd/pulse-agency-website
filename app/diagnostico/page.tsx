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

function DiagnosticoContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            whatsapp_optin: false,
            objetivo_principal: [],
        }
    });

    const objetivosWatch = watch("objetivo_principal") || [];

    const handleObjChange = (val: string, onChange: (val: string[]) => void, currentList: string[]) => {
        if (currentList.includes(val)) {
            onChange(currentList.filter(o => o !== val));
        } else {
            if (currentList.length < 2) onChange([...currentList, val]);
        }
    };

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

            // Redirect based on tier
            router.push(`/gracias-diagnostico?tier=${result.tier}`);

        } catch (err: any) {
            console.error(err);
            setErrorMsg(err.message || "Error de conexión. Intenta nuevamente.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 bg-background pb-24">
            <SectionWrapper className="pt-32 pb-12 border-b border-white/5 bg-surface/30">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white text-center text-balance">
                    Solicita tu diagnóstico estratégico.
                </h1>
                <p className="text-lg text-muted max-w-2xl mx-auto text-center text-balance">
                    Analizamos tu situación actual para determinar si podemos ayudarte a construir un sistema de crecimiento medible.
                </p>
            </SectionWrapper>

            <SectionWrapper className="max-w-3xl mx-auto pt-16">
                <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-8 md:p-10 rounded-2xl space-y-8">

                    {errorMsg && (
                        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {errorMsg}
                        </div>
                    )}

                    {/* 1. Información de Contacto */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">1. Información Personal</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Nombre *</label>
                                <input {...register("nombre")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Apellido *</label>
                                <input {...register("apellido")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.apellido && <p className="text-red-400 text-xs mt-1">{errors.apellido.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Email Corporativo *</label>
                                <input type="email" {...register("email")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Teléfono (con código de país) *</label>
                                <input type="tel" placeholder="+1234567890" {...register("telefono")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* 2. Empresa */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-2">2. Sobre tu Empresa</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Empresa *</label>
                                <input {...register("empresa")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.empresa && <p className="text-red-400 text-xs mt-1">{errors.empresa.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Web o Instagram *</label>
                                <input {...register("web_o_instagram")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.web_o_instagram && <p className="text-red-400 text-xs mt-1">{errors.web_o_instagram.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">País *</label>
                                <input {...register("pais")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary" />
                                {errors.pais && <p className="text-red-400 text-xs mt-1">{errors.pais.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Industria *</label>
                                <select {...register("industria")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary">
                                    <option value="">Seleccionar...</option>
                                    <option value="Construcción">Construcción</option>
                                    <option value="Servicios profesionales">Servicios profesionales</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Ecommerce">Ecommerce</option>
                                    <option value="Salud">Salud</option>
                                    <option value="Consultoría">Consultoría</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                {errors.industria && <p className="text-red-400 text-xs mt-1">{errors.industria.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Ingresos Mensuales *</label>
                                <select {...register("ingresos_mensuales")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary">
                                    <option value="">Seleccionar...</option>
                                    <option value="<5k">&lt;$5k USD</option>
                                    <option value="5k-20k">$5k - $20k USD</option>
                                    <option value="20k-50k">$20k - $50k USD</option>
                                    <option value="50k+">+$50k USD</option>
                                </select>
                                {errors.ingresos_mensuales && <p className="text-red-400 text-xs mt-1">{errors.ingresos_mensuales.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Presupuesto Mensual de Marketing / Ads *</label>
                                <select {...register("presupuesto_marketing")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary">
                                    <option value="">Seleccionar...</option>
                                    <option value="<500">&lt;$500 USD</option>
                                    <option value="500-2k">$500 - $2k USD</option>
                                    <option value="2k-5k">$2k - $5k USD</option>
                                    <option value="5k+">+$5k USD</option>
                                </select>
                                {errors.presupuesto_marketing && <p className="text-red-400 text-xs mt-1">{errors.presupuesto_marketing.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Urgencia del proyecto *</label>
                                <select {...register("urgencia")} className="w-full h-11 bg-surface border border-border rounded-md px-4 text-white focus:ring-2 focus:ring-primary">
                                    <option value="">Seleccionar...</option>
                                    <option value="ASAP">Lo antes posible (ASAP)</option>
                                    <option value="30 días">En los próximos 30 días</option>
                                    <option value="90 días">En evaluación para el trimestre (90 días)</option>
                                </select>
                                {errors.urgencia && <p className="text-red-400 text-xs mt-1">{errors.urgencia.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-zinc-300 block">Objetivo Principal (Elige máximo 2) *</label>
                            <Controller
                                name="objetivo_principal"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {["Más clientes", "Automatizar procesos", "Ordenar CRM", "Branding", "Escalar operaciones"].map(opt => (
                                            <label
                                                key={opt}
                                                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer transition-colors ${field.value.includes(opt) ? "bg-primary/20 border-primary shadow-sm" : "bg-surface border-border hover:bg-surface-hover"
                                                    } ${field.value.length >= 2 && !field.value.includes(opt) ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2 focus:ring-offset-background"
                                                    checked={field.value.includes(opt)}
                                                    onChange={() => handleObjChange(opt, field.onChange, field.value)}
                                                    disabled={field.value.length >= 2 && !field.value.includes(opt)}
                                                />
                                                <span className="text-sm text-white">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            />
                            {errors.objetivo_principal && <p className="text-red-400 text-xs mt-1">{errors.objetivo_principal.message}</p>}
                        </div>

                        <div className="space-y-4 pt-2">
                            <label className="text-sm font-medium text-zinc-300 block">¿Te interesa explorar Capital para crecimiento (Net-15/Net-30)? *</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer text-white">
                                    <input type="radio" value="Sí" {...register("interes_capital")} className="text-primary" /> Sí
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-white">
                                    <input type="radio" value="No" {...register("interes_capital")} className="text-primary" /> No
                                </label>
                            </div>
                            {errors.interes_capital && <p className="text-red-400 text-xs">{errors.interes_capital.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300 block">Comentarios adicionales (Opcional)</label>
                            <textarea {...register("comentario")} rows={3} className="w-full bg-surface border border-border rounded-md p-4 text-white focus:ring-2 focus:ring-primary resize-none" />
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="mt-1">
                                <input type="checkbox" {...register("privacidad_check")} className="w-4 h-4 text-primary bg-background border-border rounded cursor-pointer" />
                            </div>
                            <span className="text-sm text-muted group-hover:text-zinc-300 transition-colors">
                                He leído y acepto la <a href="/legal/privacy" target="_blank" className="text-primary hover:underline">Política de Privacidad</a>. *
                            </span>
                        </label>
                        {errors.privacidad_check && <p className="text-red-400 text-xs">{errors.privacidad_check.message}</p>}

                        <label className="flex items-start gap-3 cursor-pointer group bg-surface/50 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                            <div className="mt-1">
                                <input type="checkbox" {...register("whatsapp_optin")} className="w-4 h-4 text-green-500 bg-background border-border rounded cursor-pointer" />
                            </div>
                            <span className="text-sm text-zinc-300 font-medium">
                                Acepto recibir recordatorios y comunicaciones estratégicas por WhatsApp. (Recomendado)
                            </span>
                        </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Evaluando perfil...
                            </>
                        ) : "Evaluar solicitud"}
                    </Button>
                </form>
            </SectionWrapper>
        </div>
    );
}

export default function DiagnosticoPage() {
    return (
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>}>
            <DiagnosticoContent />
        </Suspense>
    );
}
