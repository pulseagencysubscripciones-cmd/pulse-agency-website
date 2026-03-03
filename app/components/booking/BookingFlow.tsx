"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Calendar as CalendarIcon, Clock, UserCheck, Sparkles } from "lucide-react";
import Calendar from "@/app/components/booking/Calendar";
import TimeSlots from "@/app/components/booking/TimeSlots";
import BookingForm from "@/app/components/booking/BookingForm";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Step = "date" | "time" | "form" | "success";

export default function BookingFlow() {
    const [step, setStep] = useState<Step>("date");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setStep("time");
    };

    const handleSlotSelect = (slot: string) => {
        setSelectedSlot(slot);
        setStep("form");
    };

    const handleFormSubmit = async (formData: any) => {
        setLoading(true);
        try {
            const res = await fetch("/api/booking/book", {
                method: "POST",
                body: JSON.stringify({
                    ...formData,
                    start_time: selectedSlot,
                }),
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setSuccessData({ ...formData, slot: selectedSlot });
            setStep("success");

            // Trigger email notification (fire and forget)
            fetch("/api/notify/email", {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                    name: formData.name,
                    date: format(selectedDate!, "PPPP", { locale: es }),
                    time: format(new Date(selectedSlot!), "HH:mm"),
                    meetLink: data.meetLink
                }),
            });

        } catch (err) {
            console.error("Booking submission error:", err);
            alert("Hubo un error al procesar tu reserva. Por favor intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4 md:p-8">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#7C3AED]/5 blur-[120px] rounded-full" />

            <div className="w-full max-w-6xl relative z-10">
                {/* Progress Header */}
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex items-center gap-4">
                        {step !== "date" && step !== "success" && (
                            <button
                                onClick={() => setStep(step === "time" ? "date" : "time")}
                                className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}
                        <div>
                            <h2 className="text-2xl md:text-4xl font-black text-white flex items-center gap-2">
                                {step === "success" ? "¡Todo listo!" : "Agenda tu Sesión"}
                                <Sparkles className="text-[#7C3AED] h-6 w-6" />
                            </h2>
                            <p className="text-zinc-500 text-sm md:text-base font-medium">Pulse Agency Strategic Call</p>
                        </div>
                    </div>

                    <div className="hidden md:flex gap-4">
                        <StepIndicator active={step === "date"} icon={<CalendarIcon size={16} />} label="Fecha" />
                        <StepIndicator active={step === "time"} icon={<Clock size={16} />} label="Hora" />
                        <StepIndicator active={step === "form"} icon={<UserCheck size={16} />} label="Datos" />
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-[#09090B]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">

                    {/* Left Sidebar (Desktop) */}
                    <div className="w-full md:w-80 bg-zinc-950/50 p-8 md:p-10 border-r border-white/5 flex flex-col justify-between">
                        <div>
                            <div className="w-14 h-14 bg-[#7C3AED] rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                                <Sparkles className="text-white h-7 w-7" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">Sesión Estratégica 1:1</h3>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
                                Analizaremos tu modelo de negocio y diseñaremos un plan de escalado personalizado.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <Clock size={16} className="text-primary" />
                                    <span>30 minutos</span>
                                </div>
                                {selectedDate && (
                                    <div className="flex items-center gap-3 text-sm text-zinc-300">
                                        <CalendarIcon size={16} className="text-primary" />
                                        <span className="capitalize">{format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}</span>
                                    </div>
                                )}
                                {selectedSlot && (
                                    <div className="flex items-center gap-3 text-sm text-zinc-300 font-bold">
                                        <Clock size={16} className="text-primary" />
                                        <span>{format(new Date(selectedSlot), "HH:mm")}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Powered by Pulse Systems</p>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 p-6 md:p-10 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {step === "date" && (
                                <motion.div
                                    key="date-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col justify-center"
                                >
                                    <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                                </motion.div>
                            )}

                            {step === "time" && selectedDate && (
                                <motion.div
                                    key="time-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full"
                                >
                                    <TimeSlots
                                        date={selectedDate}
                                        selectedSlot={selectedSlot}
                                        onSlotSelect={handleSlotSelect}
                                    />
                                </motion.div>
                            )}

                            {step === "form" && (
                                <motion.div
                                    key="form-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full flex flex-col justify-center max-w-md mx-auto"
                                >
                                    <div className="mb-8">
                                        <h4 className="text-2xl font-bold mb-2">Tus datos</h4>
                                        <p className="text-zinc-500">Completa el formulario para confirmar la cita.</p>
                                    </div>
                                    <BookingForm onSubmit={handleFormSubmit} loading={loading} />
                                </motion.div>
                            )}

                            {step === "success" && (
                                <motion.div
                                    key="success-step"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                                        <UserCheck size={40} />
                                    </div>
                                    <h4 className="text-3xl font-black">¡Cita Confirmada!</h4>
                                    <p className="text-zinc-400 max-w-sm mx-auto">
                                        Hemos enviado los detalles y el link de <b>Google Meet</b> a <span className="text-white font-bold">{successData?.email}</span>.
                                    </p>
                                    <div className="pt-8">
                                        <button
                                            onClick={() => window.location.href = "/"}
                                            className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold"
                                        >
                                            Volver al Inicio
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepIndicator({ active, icon, label }: { active: boolean; icon: React.ReactNode; label: string }) {
    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${active ? "bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.3)]" : "text-zinc-600"}`}>
            {icon}
            <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </div>
    );
}
