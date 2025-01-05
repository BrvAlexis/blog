"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const LongevityBenefits = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2>Les Bénéfices d'Être Acteur de Votre Longévité</h2>
          <p className="text-gray-600 mb-6">
            En prenant soin de votre santé, vous pouvez améliorer votre qualité de vie et prolonger votre durée de vie.
          </p>
          <ul className="mb-6">
            <li>✅ Amélioration de la flexibilité</li>
            <li>✅ Meilleure santé cardiovasculaire</li>
            <li>✅ Renforcement musculaire</li>
            <li>✅ Équilibre émotionnel</li>
            <li>✅ Augmentation de l'énergie quotidienne</li>
          </ul>
          <Button className="bg-blue-600 hover:bg-blue-700">
            En savoir plus
          </Button>
        </div>
        <div className="lg:w-1/2">
          <div className="relative aspect-[3/2] w-full">
            <Image 
              src="https://picsum.photos/600/400" 
              alt="Bien-être" 
              fill
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 