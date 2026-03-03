import { SectionWrapper } from "../../components/SectionWrapper";

export default function TermsPage() {
    return (
        <div className="flex-1 pb-24">
            <SectionWrapper className="pt-32 pb-16 border-b border-white/5 bg-surface/30">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                    Términos de Servicio
                </h1>
                <p className="text-muted">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
            </SectionWrapper>

            <SectionWrapper className="max-w-4xl mx-auto prose prose-invert prose-p:text-muted prose-headings:text-white prose-a:text-primary pt-16">
                <h2>1. Aceptación de los términos</h2>
                <p>Al acceder y utilizar el sitio web de Pulse Agency, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al sitio.</p>

                <h2>2. Uso de nuestro sitio</h2>
                <p>Pulse Agency proporciona información sobre servicios de marketing, inteligencia artificial automatización y capital. Nos reservamos el derecho de retirar o modificar el servicio que proporcionamos en el sitio web sin previo aviso.</p>

                <h2>3. Solicitudes de Diagnóstico y Calificación</h2>
                <p>Completar un formulario de diagnóstico en nuestro sitio no garantiza una asociación comercial. Nuestro equipo utiliza criterios internos para determinar la viabilidad operativa y estratégica (SQL, MQL, LEAD). Nos reservamos el derecho de rechazar solicitudes a nuestra entera discreción.</p>

                <h2>4. Propiedad intelectual</h2>
                <p>El sitio web y todo su contenido, características y funcionalidad son propiedad de Pulse Agency y están protegidos por derechos de autor, marcas comerciales y otras leyes de propiedad intelectual internacionales.</p>

                <h2>5. Enlaces a terceros</h2>
                <p>Nuestro sitio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por Pulse Agency, incluyendo nuestro subsitio de estructuración financiera externa (Capital). No tenemos control ni asumimos responsabilidad por el contenido, políticas de privacidad o prácticas de sitios web o servicios de terceros.</p>

                <h2>6. Limitación de responsabilidad</h2>
                <p>En ningún caso Pulse Agency será responsable de daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la incapacidad de usar el sitio o los servicios.</p>

                <h2>7. Ley aplicable</h2>
                <p>Estos términos se regirán e interpretarán de acuerdo con las leyes correspondientes, sin tener en cuenta sus disposiciones sobre conflictos de leyes.</p>
            </SectionWrapper>
        </div>
    );
}
