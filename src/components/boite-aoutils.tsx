"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Aliment = {
  code: string;
  nom: string;
  composition: string;
  teneurAntioxydant: number;
  imageUrl: string;
  categories: string[];
  marque: string;
  quantite: string;
  valeurNutritionnelle: {
    energie: number;
    proteines: number;
    glucides: number;
    sucres: number;
    lipides: number;
    saturés: number;
    fibres: number;
    sel: number;
  };
  dateDePeremption: string;
  paysOrigine: string;
};



const getImageUrl = (code: string, imageId: number) => {
  const formattedCode = code.match(/(\d{3})(\d{3})(\d{3})(\d{4})/)?.slice(1).join('/') || '';
  return `https://openfoodfacts-images.s3.eu-west-3.amazonaws.com/data/${formattedCode}/${imageId}.jpg`;
};

export const BoiteAoutils = () => {
  const [query, setQuery] = useState("");
  const [resultats, setResultats] = useState<Aliment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const rechercherAliments = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const params = new URLSearchParams();
      params.append("search_terms", query);
      params.append("json", "true");

      const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      const data = await response.json();
      console.log(data);
      const aliments: Aliment[] = data.products.map((produit: any) => ({
        code: produit.code || '',
        nom: produit.product_name || '',
        composition: produit.ingredients_text || '',
        teneurAntioxydant: produit.antioxidants || 0,
        imageUrl: getImageUrl(produit.code, 1),
        categories: Array.isArray(produit.categories) ? produit.categories : [],
        marque: produit.brands || '',
        quantite: produit.quantity || '',
        valeurNutritionnelle: {
          energie: produit.nutriments?.energy || 0,
          proteines: produit.nutriments?.proteins || 0,
          glucides: produit.nutriments?.carbohydrates || 0,
          sucres: produit.nutriments?.sugars || 0,
          lipides: produit.nutriments?.fat || 0,
          saturés: produit.nutriments?.saturated_fat || 0,
          fibres: produit.nutriments?.fiber || 0,
          sel: produit.nutriments?.salt || 0,
        },
        dateDePeremption: produit.expiration_date || '',
        paysOrigine: produit.countries || '',
      }));

      setResultats(aliments);
      setShowResults(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    rechercherAliments();
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Recherchez des Aliments et Découvrez leur Composition
          </h2>

          <Input
            type="text"
            placeholder="Rechercher un aliment..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />

          <Button onClick={handleSearch} className="mt-4">Rechercher</Button>

          {hasError && (
            <div className="text-red-500">Une erreur est survenue.</div>
          )}

          {showResults && resultats.length > 0 && (
            <Table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Image</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Code</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Nom</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Composition</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Teneur en Antioxydants</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Catégories</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Marque</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Quantité</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Énergie (kcal)</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Protéines</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Glucides</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Sucres</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Lipides</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Saturés</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Fibres</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Sel</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date de Péremption</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Pays d'Origine</th>
                </tr>
              </thead>
              <tbody>
                {resultats.map((aliment) => (
                  <tr key={aliment.code} className="hover:bg-gray-50 transition duration-200">
                    <td className="py-4 px-4">
                      <div className="relative group">
                        <img
                          src={aliment.imageUrl}
                          alt={aliment.nom}
                          className="w-24 h-24 object-cover rounded-lg transition-transform duration-200 transform group-hover:scale-110"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4">{aliment.code}</td>
                    <td className="py-4 px-4">{aliment.nom}</td>
                    <td className="py-4 px-4">{aliment.composition}</td>
                    <td className="py-4 px-4">{aliment.teneurAntioxydant} mg</td>
                    <td className="py-4 px-4">{aliment.categories.join(", ")}</td>
                    <td className="py-4 px-4">{aliment.marque}</td>
                    <td className="py-4 px-4">{aliment.quantite}</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.energie} kcal</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.proteines} g</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.glucides} g</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.sucres} g</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.lipides} g</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.saturés} g</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.fibres} g</td>
                    <td className="py-4 px-4">{aliment.valeurNutritionnelle.sel} g</td>
                    <td className="py-4 px-4">{aliment.dateDePeremption}</td>
                    <td className="py-4 px-4">{aliment.paysOrigine}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {showResults && resultats.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Aucun aliment trouvé pour votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 