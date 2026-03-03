"use client";

export function LogosBand() {
    const logos = [
        { name: "HubSpot", abbr: "HS" },
        { name: "Salesforce", abbr: "SF" },
        { name: "ActiveCampaign", abbr: "AC" },
        { name: "Meta Ads", abbr: "M" },
        { name: "Google Ads", abbr: "G" },
        { name: "LinkedIn Ads", abbr: "LI" },
        { name: "Make.com", abbr: "MK" },
        { name: "OpenAI", abbr: "AI" },
    ];

    return (
        <section className="border-y border-white/5 py-8 bg-black overflow-hidden">
            <div className="container-pulse mb-5">
                <p className="text-center text-[10px] font-black tracking-[0.3em] uppercase text-zinc-600">
                    Tecnologías & Plataformas que utilizamos
                </p>
            </div>

            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee flex gap-8 items-center">
                    {[...logos, ...logos].map((logo, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 shrink-0 px-6 py-2.5 rounded-full border border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/5 transition-all cursor-default group"
                        >
                            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/20 flex items-center justify-center">
                                <span className="text-primary text-[9px] font-black">{logo.abbr}</span>
                            </div>
                            <span className="text-zinc-500 text-[12px] font-semibold tracking-wide group-hover:text-zinc-300 transition-colors whitespace-nowrap">
                                {logo.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
