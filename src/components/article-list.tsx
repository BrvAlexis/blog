"use client";

import { useEffect, useState, memo } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { ErrorBoundary } from "@/components/error-boundary";
import { ArticleGrid } from "@/components/article-grid";

const ArticleCard = memo(({ article }: { article: DataType }) => {
  return (
    <Link href={`/articles/${article.id}`} className="group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
        {article.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              layout="responsive"
              width={600}
              height={400}
            />
          </div>
        )}

        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Badge variant="secondary">{article.category}</Badge>
            <time dateTime={article.createdAt}>
              {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          <CardTitle className="group-hover:text-blue-600 transition-colors">
            {article.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {article.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Par {article.authorName}
            </span>
            <Badge variant="outline">Lire plus</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

ArticleCard.displayName = 'ArticleCard';

const ArticlesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="h-[400px]">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <div className="flex gap-2 mb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const ArticleList = () => {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6; // Nombre d'articles par page

  const fetchArticles = () => {
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      articlesQuery,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as DataType[];
        
        setArticles(data);
        setIsLoading(false);
      },
      (error) => {
        console.error("Erreur lors du chargement des articles:", error);
        setError(error as Error);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchArticles();
    return () => unsubscribe();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Logique pour récupérer les articles de la page spécifiée
  };

  if (error) {
    return <ErrorBoundary error={error} reset={fetchArticles} />;
  }

  if (isLoading) {
    return <ArticlesSkeleton />;
  }

  return (
    <ArticleGrid
      articles={articles}
      totalPages={Math.ceil(articles.length / articlesPerPage)}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};
