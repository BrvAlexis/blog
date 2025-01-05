import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <section className="bg-gray-50 py-36">
      <div className="container-custom">
        <div className="mx-auto text-center">
          
          <h1 className="text-6xl md:text-7xl lg:text-9xl font-bold mb-4 leading-[1.2]">
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
            <form className="flex w-full max-w-md gap-2 flex-col sm:flex-row">
              <input 
                type="email"
                placeholder="Votre email"
                className="flex-1 rounded-lg border border-gray-300 px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                required
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                Obtenir mon guide
              </Button>
            </form>

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
