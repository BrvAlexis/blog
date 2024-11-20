"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({ article }: { article: DataType }) => {
  return (
    <Link href={`/article/${article.id}`} className="group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
        {article.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
};

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

  useEffect(() => {
    const articlesQuery = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      articlesQuery,
      (snapshot) => {
        const data: DataType[] = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id } as DataType);
        });
        setArticles(data);
        setIsLoading(false);
      },
      (error) => {
        console.error("Erreur lors de la récupération des articles:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Skeleton className="h-6 w-32 mx-auto mb-4" />
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <ArticlesSkeleton />
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun article disponible.</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Nos Articles</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Découvrez Nos Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez notre collection d'articles sur la santé et la longévité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

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
