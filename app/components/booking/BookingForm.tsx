"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Loader2, ArrowRight } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2, "El nombre es demasiado corto"),
    email: z.string().email("Email inválido"),
    phone: z.string().optional(),
});

interface BookingFormProps {
    onSubmit: (data: { name: string; email: string; phone?: string }) => void;
    loading: boolean;
}

export default function BookingForm({ onSubmit, loading }: BookingFormProps) {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const validated = formSchema.parse(formData);
            setErrors({});
            onSubmit(validated);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                err.issues.forEach((issue) => {
                    if (issue.path[0]) newErrors[issue.path[0].toString()] = issue.message;
                });
                setErrors(newErrors);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Nombre Completo</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`
                            w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none transition-all
                            ${errors.name ? "border-red-500/50 bg-red-500/5" : "border-white/5 focus:border-primary focus:bg-primary/5"}
                        `}
                    />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-2 ml-1">{errors.name}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Email Profesional</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="email"
                        placeholder="juan@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`
                            w-full bg-white/5 border rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none transition-all
                            ${errors.email ? "border-red-500/50 bg-red-500/5" : "border-white/5 focus:border-primary focus:bg-primary/5"}
                        `}
                    />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-2 ml-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Teléfono (WhatsApp)</label>
                <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                        type="tel"
                        placeholder="+54 9 11 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none transition-all focus:border-primary focus:bg-primary/5"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`
                    w-full py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 group transition-all
                    ${loading
                        ? "bg-zinc-800 cursor-not-allowed opacity-50"
                        : "bg-primary hover:bg-primary/90 shadow-[0_10px_30px_rgba(146,0,255,0.3)] hover:shadow-[0_10px_40px_rgba(146,0,255,0.5)] active:scale-[0.98]"}
                `}
            >
                {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                    <>
                        Confirmar Reserva
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
}
