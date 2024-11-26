"use client";

import { Badge } from "@/components/ui/badge";
import { 
  Apple, 
  Moon, 
  Dumbbell, 
  Brain
} from "lucide-react";

export const LongevityPrinciples = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">Les Piliers de la Longévité</Badge>
          <h2 className="text-4xl font-bold mb-4">Les 4 clés pour vivre plus longtemps en bonne santé</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            La science a démontré que ces quatre facteurs sont essentiels pour optimiser votre longévité et votre qualité de vie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Alimentation */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex justify-center">
              <Apple className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Alimentation Optimale</h3>
            <p className="text-gray-600 text-center">
              Une alimentation équilibrée, riche en nutriments et adaptée à vos besoins métaboliques.
            </p>
          </div>

          {/* Sommeil */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex justify-center">
              <Moon className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Sommeil Réparateur</h3>
            <p className="text-gray-600 text-center">
              Un sommeil de qualité pour la régénération cellulaire et le maintien des fonctions cognitives.
            </p>
          </div>

          {/* Activité physique */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex justify-center">
              <Dumbbell className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Activité Physique</h3>
            <p className="text-gray-600 text-center">
              Un exercice régulier adapté pour maintenir force, souplesse et endurance cardiovasculaire.
            </p>
          </div>

          {/* Gestion du stress */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex justify-center">
              <Brain className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Gestion du Stress</h3>
            <p className="text-gray-600 text-center">
              Des techniques efficaces pour réduire le stress et maintenir l'équilibre émotionnel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 