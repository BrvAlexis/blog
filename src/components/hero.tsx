import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="inline-block mb-8 bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-1 text-sm">
            +50,000 lecteurs satisfaits
          </Badge>

          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Vivez plus longtemps
            <strong className="font-extrabold text-blue-700 sm:block">
              en pleine santé
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-slate-600">
            Découvrez les dernières avancées scientifiques et conseils
            pratiques pour optimiser votre santé et votre longévité.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
            >
              Obtenir mon guide gratuit
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
            >
              Explorer les articles
            </Button>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Rejoint par plus de 1000+ professionnels de santé
          </p>
        </div>

        <div className="mt-12 w-full max-w-5xl mx-auto">
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
