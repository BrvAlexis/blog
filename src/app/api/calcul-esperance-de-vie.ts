import type { NextApiRequest, NextApiResponse } from 'next';

type CritereAvance = {
  age: number;
  sexe: "masculin" | "féminin";
  activitePhysique: "sédentaire" | "modérée" | "active";
  tabagisme: boolean;
  consommationAlcool: "faible" | "moyenne" | "élevée";
  // Ajoutez d'autres critères pertinents
};

type Resultat = {
  esperanceVie: number;
  // Ajoutez des champs supplémentaires si nécessaire
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Resultat | { message: string }>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  const critere: CritereAvance = req.body;

  if (!critere) {
    return res.status(400).json({ message: 'Critères manquants.' });
  }

  try {
    // Implémentez ici votre logique de calcul avancée en utilisant des modèles statistiques
    // Par exemple, en appelant une fonction externe ou un service de calcul

    const esperanceVie = await calculAvanceeEsperanceDeVie(critere);

    res.status(200).json({ esperanceVie });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du calcul.' });
  }
}

async function calculAvanceeEsperanceDeVie(critere: CritereAvance): Promise<number> {
  // Exemple simplifié : intégration de modèles statistiques
  // Vous devriez remplacer cette logique par celle de votre modèle réel

  let base = critere.sexe === "féminin" ? 80 : 75;

  base -= (critere.age - 30) * 0.5;

  if (critere.activitePhysique === "modérée") {
    base += 5;
  } else if (critere.activitePhysique === "active") {
    base += 10;
  }

  if (critere.tabagisme) {
    base -= 10;
  }

  if (critere.consommationAlcool === "moyenne") {
    base -= 5;
  } else if (critere.consommationAlcool === "élevée") {
    base -= 10;
  }

  // Ajoutez d'autres ajustements basés sur les critères avancés

  return Math.max(base, 0);
} 