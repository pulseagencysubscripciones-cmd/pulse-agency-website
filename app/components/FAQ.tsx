"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

const faqs = [
    {
        question: "¿Cómo funciona el sistema de adquisición de Pulse Agency?",
        answer: "Nuestro sistema combina IA y Machine Learning para identificar y calificar leads de alto valor de forma automática. Utilizamos ingeniería de crecimiento para optimizar cada paso del embudo, asegurando que tu equipo de ventas solo hable con empresas listas para comprar."
    },
    {
        question: "¿Qué tipo de empresas pueden calificar?",
        answer: "Trabajamos principalmente con empresas B2B y de servicios que facturan más de $5,000 USD mensuales y tienen un modelo de negocio escalable. Realizamos un diagnóstico inicial para asegurar que nuestra metodología pueda generar un ROI sustancial para tu caso específico."
    },
    {
        question: "¿En cuánto tiempo se ven los resultados?",
        answer: "Aunque cada industria varía, nuestros sistemas suelen mostrar optimizaciones significativas en la calidad de los leads durante los primeros 45 a 60 días de implementación y entrenamiento de los modelos de IA."
    },
    {
        question: "¿Por qué trabajar con IA y Machine Learning?",
        answer: "La IA permite una personalización y escala que es imposible lograr manualmente. Nuestro motor de Machine Learning analiza miles de puntos de datos para predecir qué prospectos tienen mayor probabilidad de conversión, reduciendo drásticamente el costo de adquisición."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-black py-12 border-t border-white/5">
            <SectionWrapper className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                        Preguntas <span className="text-primary">Frecuentes</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">
                        Todo lo que necesitas saber sobre nuestra metodología y cómo escalamos tu captación B2B.
                    </p>
                </div>

                <div className="space-y-4 max-w-4xl mx-auto px-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/5 hover:border-white/10 transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className="text-base font-semibold text-white pr-6">{faq.question}</span>
                                <ChevronDown className={`text-primary h-5 w-5 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                            </button>

                            <div
                                className={`px-5 transition-all duration-300 ease-in-out ${openIndex === index ? "pb-5 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                <p className="text-zinc-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
}
