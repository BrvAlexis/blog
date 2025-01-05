import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="relative h-64 w-full">
        <Image
          src="https://picsum.photos/600/400"
          alt="404 background"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Page introuvable
          </h1>

          <p className="mt-4 text-gray-500">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-200"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
} 