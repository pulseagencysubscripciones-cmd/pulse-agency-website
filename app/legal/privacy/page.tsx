import { SectionWrapper } from "../../components/SectionWrapper";

export default function PrivacyPage() {
    return (
        <div className="flex-1 pb-24">
            <SectionWrapper className="pt-32 pb-16 border-b border-white/5 bg-surface/30">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                    Política de Privacidad
                </h1>
                <p className="text-muted">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
            </SectionWrapper>

            <SectionWrapper className="max-w-4xl mx-auto prose prose-invert prose-p:text-muted prose-headings:text-white prose-a:text-primary pt-16">
                <h2>1. Información que recopilamos</h2>
                <p>En Pulse Agency ("nosotros", "nuestro"), recopilamos información personal que usted nos proporciona directamente cuando completa nuestros formularios de diagnóstico, se suscribe a nuestras comunicaciones o nos contacta.</p>
                <p>Esta información puede incluir, entre otros: nombre, dirección de correo electrónico, número de teléfono, información profesional y datos de su empresa.</p>

                <h2>2. Uso de la información</h2>
                <p>Utilizamos la información recopilada para:</p>
                <ul>
                    <li>Proveer, operar y mantener nuestros servicios.</li>
                    <li>Evaluar la elegibilidad de su empresa para nuestros programas de crecimiento y financiación (Capital).</li>
                    <li>Comunicarnos con usted, incluyendo el envío de correos electrónicos y mensajes de WhatsApp (si ha otorgado su consentimiento expreso).</li>
                    <li>Personalizar y mejorar su experiencia en nuestro sitio.</li>
                </ul>

                <h2>3. Compartir su información</h2>
                <p>No vendemos, intercambiamos ni alquilamos su información personal a terceros. Podemos compartir información genérica agregada no vinculada a ninguna información de identificación personal con nuestros socios comerciales.</p>

                <h2>4. Plataformas de terceros</h2>
                <p>Utilizamos HubSpot como nuestro CRM para gestionar relaciones con clientes y prospectos. Al enviar sus datos, acepta que estos sean procesados a través de la infraestructura de HubSpot bajo sus políticas de seguridad.</p>

                <h2>5. Consentimiento para comunicaciones (WhatsApp)</h2>
                <p>Si opta por recibir comunicaciones vía WhatsApp, acepta recibir mensajes automatizados (por ejemplo, recordatorios de reuniones e información estratégica) a través de nuestro proveedor (Twilio). Puede revocar este consentimiento en cualquier momento respondiendo "STOP".</p>

                <h2>6. Póngase en contacto con nosotros</h2>
                <p>Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en <a href="mailto:privacy@pulseagency.com">privacy@pulseagency.com</a>.</p>
            </SectionWrapper>
        </div>
    );
}
