"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Cómo funciona", href: "/como-funciona" },
    { name: "Contacto", href: "/contacto" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-black/85 backdrop-blur-xl border-b border-white/8 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3 group transition-opacity hover:opacity-90"
                >
                    <Image
                        src="/logo.png"
                        alt="Pulse Agency"
                        width={175}
                        height={44}
                        className="h-11 w-auto object-contain"
                        priority
                    />
                    <span className="text-white font-black text-[22px] tracking-tighter">
                        PULSE{" "}
                        <span className="text-gradient-primary" style={{
                            backgroundImage: "linear-gradient(135deg, #c084fc, #7c3aed)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            AGENCY
                        </span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-7">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-[12px] font-bold uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                        href="/credito"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-[13px] font-bold transition-all group"
                        style={{
                            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                            border: "1px solid rgba(167, 139, 250, 0.2)",
                            boxShadow: "0 4px 20px rgba(124, 58, 237, 0.35)",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 30px rgba(124, 58, 237, 0.55)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(124, 58, 237, 0.35)";
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        }}
                    >
                        Crédito NET-30
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-5">
                    <ul className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="flex items-center justify-between py-3 text-zinc-300 hover:text-white font-semibold text-base border-b border-white/5 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                    <ArrowRight className="w-4 h-4 text-zinc-600" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/credito"
                        className="flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-wider"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)" }}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Crédito NET-30
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
        </header>
    );
}
