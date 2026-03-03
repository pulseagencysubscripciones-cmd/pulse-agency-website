import { SectionWrapper } from "../components/SectionWrapper";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/Button";

export default function ResultadosPage() {
    const stats = [
        { icon: <TrendingUp className="h-6 w-6" />, value: "+145%", label: "Aumento promedio en ROI" },
        { icon: <Users className="h-6 w-6" />, value: "3x", label: "Volumen de SQL generados" },
        { icon: <Zap className="h-6 w-6" />, value: "40hrs", label: "Ahorro mensual por automatización" },
    ];

    return (
        <div className="flex-1">
            <SectionWrapper className="pt-32 pb-16 border-b border-white/5 bg-surface/30">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white text-balance">
                    Resultados medibles
                </h1>
                <p className="text-xl text-muted max-w-2xl text-balance">
                    El impacto de un sistema de adquisición de datos robusto y optimizado por inteligencia artificial.
                </p>
            </SectionWrapper>

            <SectionWrapper>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center">
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                                {stat.icon}
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                            <p className="text-muted font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                <div className="glass-panel p-10 md:p-16 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 max-w-3xl">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                            "Pulse Agency transformó nuestra forma de capturar y nutrir leads. La integración entre nuestro CRM y el sistema de automatización nos permite escalar sin contratar más personal de SDR."
                        </h3>
                        <p className="text-primary font-medium">— Director de Operaciones, Partner Tecnológico</p>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper className="text-center pb-24">
                <Button size="lg" asChild className="group text-lg">
                    <Link href="/diagnostico">
                        Solicitar diagnóstico estratégico
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            </SectionWrapper>
        </div>
    );
}
