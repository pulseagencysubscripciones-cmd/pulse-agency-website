"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Loader2, Clock } from "lucide-react";

interface TimeSlot {
    start_time: string;
}

interface TimeSlotsProps {
    date: Date;
    selectedSlot: string | null;
    onSlotSelect: (slot: string) => void;
}

export default function TimeSlots({ date, selectedSlot, onSlotSelect }: TimeSlotsProps) {
    const [slots, setSlots] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSlots() {
            setLoading(true);
            setError(null);
            try {
                const dateStr = format(date, "yyyy-MM-dd");
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Argentina/Buenos_Aires";
                const res = await fetch(`/api/booking/availability?date=${dateStr}&tz=${encodeURIComponent(tz)}`);

                if (!res.ok) {
                    const data = await res.json().catch(() => ({}));
                    throw new Error(data.error || "Error fetching slots");
                }

                const data = await res.json();

                // Transform string array to TimeSlot objects
                const typedSlots: TimeSlot[] = (data.slots || []).map((s: string) => ({ start_time: s }));
                setSlots(typedSlots);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "No se pudieron cargar los horarios.");
            } finally {
                setLoading(false);
            }
        }
        fetchSlots();
    }, [date]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-zinc-500">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p>Buscando horarios disponibles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center px-6">
                <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <Clock size={24} />
                </div>
                <p className="text-red-400 mb-6 font-medium">{error}</p>
                <button
                    onClick={() => window.location.href = "https://calendly.com/pulseagencyllc/30min"}
                    className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-bold"
                >
                    Agendar por Calendly directamente →
                </button>
            </div>
        );
    }

    if (slots.length === 0) {
        return (
            <div className="flex items-center justify-center h-full min-h-[300px] text-zinc-500">
                <p>No hay disponibilidad para este día.</p>
            </div>
        );
    }

    return (
        <div className="h-full">
            <div className="flex items-center gap-2 mb-6 text-zinc-400">
                <Clock size={18} />
                <span className="text-sm md:text-base font-medium">Available times for {format(date, "MMMM do", { locale: es })} (Miami Time)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
                {slots.map((slot) => {
                    const time = format(new Date(slot.start_time), "h:mm aa");
                    const isSelected = selectedSlot === slot.start_time;
                    return (
                        <button
                            key={slot.start_time}
                            onClick={() => onSlotSelect(slot.start_time)}
                            className={`
                                py-4 px-6 rounded-2xl border transition-all text-center font-medium
                                ${isSelected
                                    ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(146,0,255,0.3)]"
                                    : "bg-white/5 border-white/5 text-zinc-300 hover:border-primary/50 hover:bg-primary/5"}
                            `}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
