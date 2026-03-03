"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SectionWrapper } from "./SectionWrapper";

const faqs = [
    {
        question: "¿Cómo funciona el sistema de adquisición de Pulse Agency?",
        answer:
            "Nuestro sistema combina IA y Machine Learning para identificar y calificar leads de alto valor de forma automática. Utilizamos ingeniería de crecimiento para optimizar cada paso del embudo, asegurando que tu equipo de ventas solo hable con empresas listas para comprar. El sistema integra ads, CRM, automatización y analítica en una sola plataforma operativa.",
    },
    {
        question: "¿Qué tipo de empresas pueden calificar?",
        answer:
            "Trabajamos principalmente con empresas B2B y de servicios que facturan más de $5,000 USD mensuales y tienen un modelo de negocio escalable. Realizamos un diagnóstico inicial para asegurar que nuestra metodología pueda generar un ROI sustancial para tu caso específico. Si no hay fit, te lo decimos honestamente.",
    },
    {
        question: "¿En cuánto tiempo se ven los resultados?",
        answer:
            "Aunque cada industria varía, nuestros sistemas suelen mostrar primeras optimizaciones en la calidad de los leads durante los primeros 45 a 60 días de implementación. Los resultados de escala (3-5x ROI) típicamente se consolidan entre los meses 3 y 6, cuando los modelos de IA han acumulado datos suficientes para optimizar con precisión.",
    },
    {
        question: "¿Por qué trabajar con IA y Machine Learning?",
        answer:
            "La IA permite una personalización y escala que es imposible lograr manualmente. Nuestro motor de Machine Learning analiza miles de puntos de datos para predecir qué prospectos tienen mayor probabilidad de conversión, reduciendo drásticamente el costo de adquisición y aumentando la calidad del pipeline.",
    },
    {
        question: "¿Tienen contratos a largo plazo?",
        answer:
            "Empezamos con un engagement de 3 meses para implementar el sistema base. Después de eso, la mayoría de nuestros clientes continúan en modalidad mensual con opción anual. No te atamos si no estás satisfecho con los resultados— nuestra retención habla por sí sola.",
    },
    {
        question: "¿Qué pasa si ya invertí en marketing y no funcionó?",
        answer:
            "Es el escenario más común con el que trabajamos. El problema raramente es la inversión; es la falta de sistema. En el diagnóstico analizamos qué falló, por qué, y cómo un sistema basado en datos habría funcionado diferente. Muchos de nuestros mejores clientes llegaron decepcionados de otras agencias.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 relative overflow-hidden section-divider">
            <div className="absolute inset-0 bg-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-pulse relative z-10">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary/70 mb-4 block">
                        Preguntas frecuentes
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white text-balance leading-[1.08] mb-6">
                        Todo lo que necesitas{" "}
                        <span className="text-gradient-primary">saber</span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                        Respondemos las preguntas más comunes sobre nuestra metodología y cómo escalamos tu captación B2B.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index
                                    ? "border-primary/30 bg-primary/5"
                                    : "border-white/8 bg-zinc-950/40 hover:border-white/15 hover:bg-zinc-950/60"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full p-6 flex items-center justify-between text-left focus:outline-none group"
                            >
                                <span className="text-base font-semibold text-white pr-6 group-hover:text-primary transition-colors">
                                    {faq.question}
                                </span>
                                <div className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${openIndex === index
                                        ? "bg-primary border-primary text-white"
                                        : "border-white/15 text-zinc-500 group-hover:border-primary/40 group-hover:text-primary"
                                    }`}>
                                    {openIndex === index ? (
                                        <Minus className="w-3.5 h-3.5" />
                                    ) : (
                                        <Plus className="w-3.5 h-3.5" />
                                    )}
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index
                                        ? "pb-6 px-6 max-h-[400px] opacity-100"
                                        : "max-h-0 opacity-0"
                                    } overflow-hidden`}
                            >
                                <div className="w-12 h-px bg-primary/30 mb-4" />
                                <p className="text-zinc-400 leading-relaxed text-[15px]">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-12">
                    <p className="text-zinc-500 text-sm">
                        ¿No encuentras tu respuesta?{" "}
                        <a
                            href="mailto:support@pulseagencyusa.com"
                            className="text-primary hover:text-primary-light transition-colors font-semibold"
                        >
                            Escríbenos directamente →
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}
