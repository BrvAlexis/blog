"use client";

import { Hero } from "@/components/hero";
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
