import { SectionWrapper } from "../components/SectionWrapper";
import { ArrowRight, Target, Shield, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/Button";

export default function SobreNosotrosPage() {
    const values = [
        {
            icon: <Target className="h-6 w-6" />,
            title: "Obsesión por la precisión",
            desc: "Tomamos decisiones basadas en datos estructurados, no en intuiciones ni métricas de vanidad.",
        },
        {
            icon: <Cpu className="h-6 w-6" />,
            title: "Tecnología como palanca",
            desc: "La inteligencia artificial y la automatización son el núcleo de nuestro modelo operativo para maximizar la eficiencia.",
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Transparencia radical",
            desc: "Nuestros dashboards muestran la verdad desnuda. Sin excusas. Medimos lo que importa para el crecimiento de tu negocio.",
        },
    ];

    return (
        <div className="flex-1">
            <SectionWrapper className="pt-32 pb-16 border-b border-white/5 bg-surface/30">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white text-balance">
                    Nuestra filosofía
                </h1>
                <p className="text-xl text-muted max-w-2xl text-balance">
                    Construimos Pulse Agency para empresas que entienden que el crecimiento moderno requiere ingeniería y precisión, no solo creatividad.
                </p>
            </SectionWrapper>

            <SectionWrapper>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">Nuestros valores fundamentales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((val, idx) => (
                            <div key={idx} className="glass-panel p-8 rounded-2xl">
                                <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                                    {val.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                                <p className="text-muted">{val.desc}</p>
                            </div>
                        ))}
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
