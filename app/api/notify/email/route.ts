import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, date, time, tier, meetLink } = body;

        if (!email || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.FROM_EMAIL || '"Pulse Agency" <noreply@pulseagencyusa.com>',
            to: email,
            subject: "Confirmación de cita - Pulse Agency",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #05010A; color: #FFFFFF; padding: 40px; border-radius: 10px;">
                    <h1 style="color: #9200FF;">Hola ${name},</h1>
                    <p style="font-size: 16px;">Tu sesión estratégica con Pulse Agency ha sido confirmada.</p>
                    <div style="background-color: #1A1A2E; padding: 20px; border-radius: 8px; border: 1px solid #9200FF;">
                        <p><strong>📅 Fecha:</strong> ${date}</p>
                        <p><strong>🕒 Hora:</strong> ${time}</p>
                        <p><strong>🚀 Perfil:</strong> ${tier || "Diagnóstico Completo"}</p>
                        ${meetLink ? `<p><strong>🔗 Google Meet:</strong> <a href="${meetLink}" style="color: #9200FF;">Unirse a la reunión</a></p>` : ""}
                    </div>
                    <p style="margin-top: 20px;">Nos vemos pronto para escalar tu negocio.</p>
                    <p style="font-size: 12px; color: #888888;">Si necesitas reprogramar, usa el link en tu invitación de Google Calendar.</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);

        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error: any) {
        console.error("Email sending error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
