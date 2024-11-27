import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Contenu principal */}
        <div className="space-y-8">
          {/* Badge de crédibilité */}
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm">
            +50,000 lecteurs satisfaits
          </Badge>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Vivez plus longtemps en pleine santé
            </h1>

            <p className="text-xl text-slate-600">
              Découvrez les dernières avancées scientifiques et conseils
              pratiques pour optimiser votre santé et votre longévité.
            </p>
          </div>

          {/* Section CTA */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Obtenir mon guide gratuit
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300">
                Explorer les articles
              </Button>
            </div>

            {/* Social Proof */}
            <p className="text-sm text-slate-500">
              Rejoint par plus de 1000+ professionnels de santé
            </p>
          </div>

          {/* Logos de reconnaissance */}
          <div className="pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">Vu dans</p>
            <div className="relative flex gap-6 items-center overflow-hidden">
              <motion.div
                className="flex gap-6 items-center"
                animate={{
                  x: [0, -1920], // Ajuster selon la largeur totale des logos
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[
                  "forbes",
                  "techcrunch", 
                  "wired",
                  "bloomberg",
                  "reuters",
                  "cnbc",
                  "wsj",
                  "nyt",
                  "guardian",
                  "economist"
                ].map((logo) => (
                  <Image
                    key={logo}
                    src="https://picsum.photos/seed/health-company/100/100"
                    alt={logo}
                    width={100}
                    height={40}
                    className="opacity-50 hover:opacity-70 transition-opacity"
                  />
                ))}
                {/* Duplicate logos for seamless loop */}
                {[
                  "forbes",
                  "techcrunch", 
                  "wired",
                  "bloomberg",
                  "reuters",
                  "cnbc",
                  "wsj",
                  "nyt", 
                  "guardian",
                  "economist"
                ].map((logo) => (
                  <Image
                    key={`${logo}-duplicate`}
                    src="https://picsum.photos/seed/health-company/100/100"
                    alt={logo}
                    width={100}
                    height={40}
                    className="opacity-50 hover:opacity-70 transition-opacity"
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image principale */}
        <div className="relative hidden lg:block">
          <Image
            src="https://picsum.photos/600/400"
            alt="Santé et longévité"
            width={800}
            height={400}
            className="rounded-2xl shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};
