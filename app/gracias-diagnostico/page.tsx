"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import BookingFlow from "@/app/components/booking/BookingFlow";

function GraciasContent() {
    const searchParams = useSearchParams();
    const [tier, setTier] = useState<string | null>(null);

    useEffect(() => {
        const t = searchParams.get("tier");
        if (t) setTier(t.toUpperCase());
    }, [searchParams]);

    if (!tier) {
        return (
            <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-zinc-500">Cargando...</p>
            </div>
        );
    }

    if (tier !== "SQL" && tier !== "MQL") {
        return (
            <div className="text-center py-20 px-6">
                <AlertCircle className="mx-auto h-12 w-12 text-zinc-500 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">Página no encontrada</h2>
                <p className="text-zinc-400">Por favor, vuelve al inicio.</p>
            </div>
        );
    }

    if (tier === "SQL") {
        return (
            <div className="w-full pb-20 bg-black min-h-screen">
                <BookingFlow />
            </div>
        );
    }

    // MQL Tier
    return (
        <div className="max-w-2xl mx-auto text-center py-24 px-6 bg-black min-h-screen">
            <div className="bg-zinc-950 rounded-3xl p-10 md:p-16 border border-white/8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="mb-8 flex justify-center">
                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                        <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-6 text-white">Gracias</h1>
                <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
                    Hemos recibido tus datos correctamente. Nuestro equipo revisará tu perfil y nos pondremos en contacto pronto.
                </p>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-10 opacity-50" />
                <p className="text-zinc-400">Mientras tanto, puedes seguir explorando nuestros servicios.</p>
            </div>
        </div>
    );
}

export default function GraciasPage() {
    return (
        <main
            className="flex-1 min-h-screen relative overflow-x-hidden bg-black"
        >
            <div className="pt-20 md:pt-28 text-white">
                <Suspense
                    fallback={
                        <div className="flex flex-col items-center justify-center py-40">
                            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                            <p className="text-zinc-500">Preparando tu confirmación...</p>
                        </div>
                    }
                >
                    <GraciasContent />
                </Suspense>
            </div>
        </main>
    );
}
