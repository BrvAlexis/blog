import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="container-custom">
        <div className="mx-auto text-center">
          <Badge className="inline-block mb-8">
            +50,000 lecteurs satisfaits
          </Badge>

          <h1>
            Vivez plus longtemps
            <strong className="block text-blue-700">
              en pleine santé
            </strong>
          </h1>

          <p>
            Découvrez les dernières avancées scientifiques et conseils
            pratiques pour optimiser votre santé et votre longévité.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Obtenir mon guide gratuit
            </Button>

            <Button variant="outline" className="text-blue-600 hover:bg-blue-50">
              Explorer les articles
            </Button>
          </div>

          <p>
            Rejoint par plus de 1000+ professionnels de santé
          </p>
        </div>

        <div className="mt-12 w-full mx-auto">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="https://picsum.photos/600/400"
              alt="Santé et longévité"
              fill
              className="rounded-2xl shadow-2xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
