"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, startOfToday } from "date-fns";
import { es } from "date-fns/locale";

interface CalendarProps {
    selectedDate: Date | null;
    onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfToday();

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white capitalize">
                {format(currentMonth, "MMMM yyyy", { locale: es })}
            </h3>
            <div className="flex gap-2">
                <button
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                    disabled={isSameMonth(currentMonth, today)}
                    className="p-2 hover:bg-white/5 rounded-lg border border-white/10 disabled:opacity-30 transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                    className="p-2 hover:bg-white/5 rounded-lg border border-white/10 transition-all"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
        return (
            <div className="grid grid-cols-7 mb-4">
                {days.map((day) => (
                    <div key={day} className="text-center text-zinc-500 text-xs font-semibold uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const isDisabled = !isSameMonth(day, monthStart) || isBefore(day, today);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isToday = isSameDay(day, today);

                days.push(
                    <button
                        key={day.toString()}
                        disabled={isDisabled}
                        onClick={() => onDateSelect(cloneDay)}
                        className={`
                            relative h-14 w-full flex items-center justify-center rounded-xl text-sm transition-all
                            ${isDisabled ? "text-zinc-800 cursor-default" : "hover:bg-white/5 text-zinc-300"}
                            ${isSelected ? "bg-[#9200FF] !text-white !font-bold shadow-[0_0_20px_rgba(146,0,255,0.4)]" : ""}
                            ${isToday && !isSelected ? "text-[#9200FF]" : ""}
                        `}
                    >
                        <span>{format(day, "d")}</span>
                        {isToday && !isSelected && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#9200FF] rounded-full" />
                        )}
                    </button>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7 gap-1" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }

        return <div className="space-y-1">{rows}</div>;
    };

    return (
        <div className="p-8 bg-[#0A0514] rounded-[2rem] border border-white/5 shadow-2xl">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
