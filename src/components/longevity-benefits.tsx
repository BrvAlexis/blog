"use client";

import { Badge } from "@/components/ui/badge";

export const LongevityBenefits = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0">
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h2 className="text-4xl font-bold mb-4">Les Bénéfices d'Être Acteur de Votre Longévité</h2>
          <p className="text-gray-600 mb-6">
            En prenant soin de votre santé, vous pouvez améliorer votre qualité de vie et prolonger votre durée de vie.
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>✅ Amélioration de la flexibilité</li>
            <li>✅ Meilleure santé cardiovasculaire</li>
            <li>✅ Renforcement musculaire</li>
            <li>✅ Équilibre émotionnel</li>
            <li>✅ Augmentation de l'énergie quotidienne</li>
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            En savoir plus
          </button>
        </div>
        <div className="lg:w-1/2">
          <img src="https://picsum.photos/600/400" alt="Bien-être" className="rounded-lg shadow-lg h-1/2" />
        </div>
      </div>
    </section>
  );
}; 