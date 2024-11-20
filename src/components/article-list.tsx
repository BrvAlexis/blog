import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const ArticleList = ({ articles }: { articles: DataType[] }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête de la section */}
        <div className="text-center mb-16">
          <Badge className="mb-4">Nos Articles</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Découvrez Nos Derniers Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez notre collection d'articles soigneusement rédigés pour vous
            tenir informé des dernières actualités et tendances.
          </p>
        </div>

        {/* Grille d'articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              href={`/article/${article.id}`}
              key={article.id}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Image de l'article */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <CardHeader>
                  {/* Métadonnées de l'article */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <time dateTime={article.createdAt}>
                      {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    •<span>{article.readTime} min de lecture</span>
                  </div>

                  <CardTitle className="group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  {/* Aperçu et auteur */}
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={article.authorImage}
                        alt={article.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      Par {article.authorName}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Bouton "Voir plus" */}
        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            Voir tous les articles
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
