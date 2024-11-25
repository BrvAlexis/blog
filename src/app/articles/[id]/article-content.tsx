"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ArticleContent = ({ id }: { id: string }) => {
  const [article, setArticle] = useState<DataType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const articleRef = doc(db, "articles", id);

    const unsubscribe = onSnapshot(
      articleRef,
      (doc) => {
        if (doc.exists()) {
          setArticle({ id: doc.id, ...doc.data() } as DataType);
        } else {
          setError(new Error("Article non trouvé"));
        }
      },
      (error) => {
        console.error("Erreur lors du chargement de l'article:", error);
        setError(error as Error);
      }
    );

    return unsubscribe;
  }, [id]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto w-full p-4">
        <div className="mb-10">
          <Link href="/articles">
            <Button>Retour aux articles</Button>
          </Link>
        </div>
        <p className="text-red-500">Une erreur est survenue: {error.message}</p>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <article className="max-w-3xl mx-auto w-full p-4">
      <div className="mb-10">
        <Link href="/articles">
          <Button variant="outline">Retour aux articles</Button>
        </Link>
      </div>
      
      {article.image && (
        <div className="relative aspect-video mb-8">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      
      <div className="space-y-4">
        <Badge variant="secondary">{article.category}</Badge>
        
        <h1 className="text-4xl font-bold">{article.title}</h1>
        
        <div className="flex items-center gap-2 text-gray-500">
          <span>Par {article.authorName}</span>
          <span>•</span>
          <time dateTime={article.createdAt}>
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
          </time>
        </div>
        
        <div className="prose max-w-none mt-8">
          {article.description}
        </div>
      </div>
    </article>
  );
}; 