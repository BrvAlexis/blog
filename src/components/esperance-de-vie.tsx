"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Critere = {
  age: number;
  sexe: "masculin" | "féminin";
  activitePhysique: "sédentaire" | "modérée" | "active";
  tabagisme: boolean;
  consommationAlcool: "faible" | "moyenne" | "élevée";
  // Ajoutez d'autres critères pertinents
};

export const EsperanceDeVie = () => {
  const [critere, setCritere] = useState<Critere>({
    age: 30,
    sexe: "féminin",
    activitePhysique: "sédentaire",
    tabagisme: false,
    consommationAlcool: "faible",
    // Initialisez les autres critères
  });
  const [esperance, setEsperance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const calculerEsperanceDeVie = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch('/api/calcul-esperance-de-vie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(critere)
      });

      if (!response.ok) {
        throw new Error("Erreur lors du calcul");
      }

      const data = await response.json();
      setEsperance(data.esperanceVie);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <Badge className="mb-4">Calculateur d'Espérance de Vie</Badge>

          <h2 className="text-3xl font-bold text-gray-900">
            Estimez votre Espérance de Vie
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="number"
                label="Âge"
                value={critere.age}
                onChange={(e) =>
                  setCritere({ ...critere, age: Number(e.target.value) })
                }
                className="flex-1"
                placeholder="Entrez votre âge"
              />
              <select
                value={critere.sexe}
                onChange={(e) =>
                  setCritere(
                    { ...critere, sexe: e.target.value as Critere["sexe"] }
                  )
                }
                className="flex-1 border border-gray-300 rounded-lg p-2"
              >
                <option value="féminin">Féminin</option>
                <option value="masculin">Masculin</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={critere.activitePhysique}
                onChange={(e) =>
                  setCritere({
                    ...critere,
                    activitePhysique:
                      e.target.value as Critere["activitePhysique"],
                  })
                }
                className="flex-1 border border-gray-300 rounded-lg p-2"
              >
                <option value="sédentaire">Sédentaire</option>
                <option value="modérée">Modérée</option>
                <option value="active">Active</option>
              </select>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={critere.tabagisme}
                  onChange={(e) =>
                    setCritere({ ...critere, tabagisme: e.target.checked })
                  }
                  className="mr-2"
                />
                Tabagisme
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={critere.consommationAlcool}
                onChange={(e) =>
                  setCritere({
                    ...critere,
                    consommationAlcool:
                      e.target.value as Critere["consommationAlcool"],
                  })
                }
                className="flex-1 border border-gray-300 rounded-lg p-2"
              >
                <option value="faible">Faible</option>
                <option value="moyenne">Moyenne</option>
                <option value="élevée">Élevée</option>
              </select>
            </div>

            <Button onClick={calculerEsperanceDeVie} className="mt-4" disabled={isLoading}>
              {isLoading ? "Calcul en cours..." : "Calculer"}
            </Button>
          </div>

          {hasError && (
            <div className="text-red-500">Une erreur est survenue lors du calcul.</div>
          )}

          {esperance !== null && !hasError && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-2xl font-semibold text-blue-600">
                Votre espérance de vie estimée est de {esperance} ans.
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 