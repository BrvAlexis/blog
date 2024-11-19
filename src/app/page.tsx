"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <>
      <main>
        <section className="hero">
          <h1 className="text-4xl font-bold flex justify-center items-center h-screen">
            Hero
          </h1>
        </section>
        <section className="articles">
          <h1 className="text-2xl font-bold flex justify-center items-center h-screen">
            Listes Articles
          </h1>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
              <Link href={`/article/${article.id}`} key={article.id}>
                <Card className="hover:scale-105 transition-all duration-300">
                  <CardHeader>{article.title}</CardHeader>
                  <CardContent>
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="object-cover rounded-md w-full h-full"
                    />
                  </CardContent>
                  <p className="text-sm text-gray-500">
                    écrit par {article.authorName}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
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
    </>
  );
}
