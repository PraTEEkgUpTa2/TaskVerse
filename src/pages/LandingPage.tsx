import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Referral } from "@/components/Referral";
import { Gamification } from "@/components/Gamification";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Referral />
      <Gamification />
      <FAQ />
      <Footer />
    </div>
  );
}