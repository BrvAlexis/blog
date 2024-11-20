import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Colonne image */}
          <div className="relative">
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="/scientist-team.webp"
                alt="Notre équipe de chercheurs"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Carte statistique - Publications */}
            <div className="absolute -right-6 top-20 bg-white p-6 rounded-xl shadow-lg max-w-[200px]">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-blue-600">50+</span>
                <span className="text-gray-600 mt-2">
                  Publications scientifiques
                </span>
              </div>
            </div>

            {/* Carte statistique - Lecteurs */}
            <div className="absolute -left-6 bottom-20 bg-white p-6 rounded-xl shadow-lg max-w-[200px]">
              <div className="flex flex-col items-center text-center">
                <span className="text-4xl font-bold text-blue-600">100K+</span>
                <span className="text-gray-600 mt-2">Lecteurs mensuels</span>
              </div>
            </div>
          </div>

          {/* Colonne contenu */}
          <div className="space-y-8">
            <Badge className="mb-4">Notre Mission</Badge>

            <h2 className="text-4xl font-bold text-gray-900">
              La Science de la Longévité, Accessible à Tous
            </h2>

            <p className="text-gray-600 text-lg">
              Notre équipe de chercheurs et médecins s'engage à traduire les
              dernières avancées scientifiques en conseils pratiques et
              compréhensibles. Nous croyons que la connaissance scientifique sur
              la santé et la longévité doit être accessible à tous.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  title: "Expertise",
                  desc: "Équipe de chercheurs qualifiés",
                },
                {
                  title: "Rigueur",
                  desc: "Sources scientifiques vérifiées",
                },
                {
                  title: "Clarté",
                  desc: "Vulgarisation accessible",
                },
                {
                  title: "Impact",
                  desc: "Conseils applicables",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Découvrir nos recherches
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300">
                Consulter nos articles
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
