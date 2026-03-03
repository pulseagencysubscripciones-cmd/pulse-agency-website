import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";

const footerLinks = {
    platform: [
        { name: "Cómo funciona", href: "/como-funciona" },
        { name: "Contacto", href: "/contacto" },
        { name: "Diagnóstico gratuito", href: "/#diagnostico" },
        { name: "Capital NET-30", href: "/credito" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/legal/privacy" },
        { name: "Terms of Service", href: "/legal/terms" },
    ],
    contact: [
        { name: "support@pulseagencyusa.com", href: "mailto:support@pulseagencyusa.com", icon: Mail },
        { name: "United States", href: "#", icon: MapPin },
    ],
};

const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6 lg:col-span-1">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <Image
                                src="/logo.png"
                                alt="Pulse Agency"
                                width={140}
                                height={36}
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-white font-black text-[18px] tracking-tighter">
                                PULSE <span className="text-primary">AGENCY</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 text-[13px] leading-relaxed max-w-[220px]">
                            Sistemas predictivos de adquisición B2B con IA y Machine Learning.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>

                        {/* Review badges */}
                        <div className="flex gap-3">
                            <a
                                href="https://maps.app.goo.gl/5U2e1SfyftaeHp4e7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.02] hover:bg-white/5 transition-all"
                            >
                                <img src="/icons/google-g.svg" alt="Google" className="w-3.5 h-3.5" />
                                <span className="text-zinc-500 text-[10px] font-bold">4.9 ★</span>
                            </a>
                            <a
                                href="https://www.trustpilot.com/review/pulseagencyusa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.02] hover:bg-white/5 transition-all"
                            >
                                <img src="/icons/trustpilot-star.svg" alt="Trustpilot" className="w-3.5 h-3.5" />
                                <span className="text-zinc-500 text-[10px] font-bold">4.8 ★</span>
                            </a>
                        </div>
                    </div>

                    {/* Platform links */}
                    <div>
                        <h4 className="text-white font-black text-[11px] tracking-[0.2em] uppercase mb-6">Platform</h4>
                        <ul className="space-y-3">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-zinc-500 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-black text-[11px] tracking-[0.2em] uppercase mb-6">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-zinc-500 hover:text-white text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-black text-[11px] tracking-[0.2em] uppercase mb-6">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.contact.map(({ name, href, icon: Icon }) => (
                                <li key={name}>
                                    <a
                                        href={href}
                                        className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors group"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* CTA mini */}
                        <a
                            href="#diagnostico"
                            className="mt-8 w-full flex items-center justify-center py-3 rounded-xl text-white text-xs font-bold uppercase tracking-wider transition-all"
                            style={{
                                background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(109,40,217,0.3))",
                                border: "1px solid rgba(124,58,237,0.3)",
                            }}
                        >
                            Diagnóstico gratuito →
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-600 text-xs">
                        © 2026 Pulse Agency LLC · Todos los derechos reservados.
                    </p>
                    <p className="text-zinc-600 text-xs">
                        Diseñamos sistemas de adquisición medibles. IA aplicada al crecimiento B2B.
                    </p>
                </div>
            </div>
        </footer>
    );
}
