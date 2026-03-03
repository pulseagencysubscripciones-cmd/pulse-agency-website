import { Suspense } from "react";
import { Loader2 } from "lucide-react";

import { HeroSection } from "./components/HeroSection";
import { LogosBand } from "./components/LogosBand";
import { ProblemSolutionSection } from "./components/ProblemSolutionSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { StatsSection } from "./components/StatsSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { FAQSection } from "./components/FAQSection";
import { CTASection } from "./components/CTASection";
import DiagnosticoForm from "./components/DiagnosticoForm";

export default function Home() {
  return (
    <>
      {/* 1. HERO — Value proposition + VSL */}
      <HeroSection />

      {/* 2. LOGOS BAND — Tech & Platform credibility */}
      <LogosBand />

      {/* 3. PROBLEM / SOLUTION — Identify pain + present fix */}
      <ProblemSolutionSection />

      {/* 4. HOW IT WORKS — 4-step methodology (trust builder) */}
      <HowItWorksSection />

      {/* 5. STATS — Social proof by numbers */}
      <StatsSection />

      {/* 6. TESTIMONIALS — Emotional social proof */}
      <TestimonialsSection />

      {/* 7. DIAGNOSTIC FORM — Lead capture / conversion */}
      <section id="diagnostico" className="bg-black border-t border-white/5 py-16 relative z-20">
        <div className="container-pulse">
          <Suspense
            fallback={
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            }
          >
            <DiagnosticoForm />
          </Suspense>
        </div>
      </section>

      {/* 8. FAQ — Handle objections */}
      <FAQSection />

      {/* 9. FINAL CTA — Last push to convert */}
      <CTASection />
    </>
  );
}
