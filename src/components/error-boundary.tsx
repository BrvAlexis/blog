"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";

type ErrorBoundaryProps = {
  error: Error;
  reset: () => void;
};

export const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  useEffect(() => {
    console.error("Erreur dans l'application:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oups ! Quelque chose s'est mal passé
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Nous n'avons pas pu charger les articles. Veuillez réessayer plus tard.
      </p>
      <Button onClick={reset} variant="default">
        Réessayer
      </Button>
    </div>
  );
}; 