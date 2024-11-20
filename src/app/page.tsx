"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { ArticleList } from "@/components/article-list";

export default function Home() {
  const [articles, setArticles] = useState<DataType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "articles"), (snapshot) => {
      const data: DataType[] = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as DataType);
      });
      setArticles(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <main>
      <Hero />
      <ArticleList articles={articles} />
      <section className="about">
        <h1 className="text-2xl font-bold flex justify-center items-center h-screen">
          A propos
        </h1>
      </section>
      <section className="contact">
        <h1 className="text-2xl font-bold flex justify-center items-center h-screen">
          Contact
        </h1>
      </section>
      <footer className="text-2xl font-bold flex justify-center items-center h-screen">
        Footer
      </footer>
    </main>
  );
}
