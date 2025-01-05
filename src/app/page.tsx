"use client";

import { Hero } from "@/components/hero";
import { LongevityPrinciples } from "@/components/longevity-principles";
import { LongevityBenefits } from "@/components/longevity-benefits";
import { ArticleList } from "@/components/article-list";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Suspense } from "react";

import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <LongevityPrinciples />
        <LongevityBenefits />
        <Suspense fallback={<div>Chargement des articles...</div>}>
          <ArticleList />
        </Suspense>
        
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
