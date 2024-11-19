"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType, UpdatePageProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageArticle({ params }: UpdatePageProps) {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const articleId = params.id as string;
    const unsubscribe = onSnapshot(collection(db, "articles"), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (doc.id === articleId) {
          setArticles([...articles, { id: doc.id, ...data } as DataType]);
          setLoading(false);
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [params.id]);
  if (loading || !articles) return <div>Loading...</div>;

  const article = articles[0];

  return (
    <section className="max-w-3xl mx-auto w-full">
      <div className="mb-10">
        <Link href="/">
          <Button>Retour</Button>
        </Link>
      </div>
      <Image
        src={article.image}
        alt={article.title}
        width={1000}
        height={1000}
      />
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p className="text-sm text-gray-500">écrit par {article.authorName}</p>
      <p>{article.description}</p>
    </section>
  );
}
