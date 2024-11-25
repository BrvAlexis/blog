"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { DataType } from "@/types/types";
import { ArticleCard } from "@/components/article-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const ArticlesWithFilters = () => {
  const [articles, setArticles] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Obtenir les valeurs des filtres depuis l'URL
  const category = searchParams.get("category");
  const author = searchParams.get("author");
  const sortBy = searchParams.get("sortBy") || "newest";
  const search = searchParams.get("search");

  // Mettre à jour les paramètres d'URL
  const updateSearchParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        let articlesQuery = query(
          collection(db, "articles"),
          orderBy("createdAt", sortBy === "oldest" ? "asc" : "desc")
        );

        if (category) {
          articlesQuery = query(articlesQuery, where("category", "==", category));
        }
        if (author) {
          articlesQuery = query(articlesQuery, where("authorName", "==", author));
        }

        const snapshot = await getDocs(articlesQuery);
        let filteredArticles = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as DataType[];

        if (search) {
          filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(search.toLowerCase()) ||
            article.description.toLowerCase().includes(search.toLowerCase())
          );
        }

        setArticles(filteredArticles);

        const uniqueCategories = [...new Set(filteredArticles.map(a => a.category))];
        const uniqueAuthors = [...new Set(filteredArticles.map(a => a.authorName))];
        setCategories(uniqueCategories);
        setAuthors(uniqueAuthors);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category, author, sortBy, search]);

  const resetFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Tous nos articles</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Input
          placeholder="Rechercher un article..."
          value={search || ""}
          onChange={(e) => updateSearchParams("search", e.target.value)}
          className="w-full"
        />

        <Select
          value={category || "all"}
          onValueChange={(value) => updateSearchParams("category", value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={author || "all"}
          onValueChange={(value) => updateSearchParams("author", value === "all" ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Auteur" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les auteurs</SelectItem>
            {authors.map((auth) => (
              <SelectItem key={auth} value={auth}>
                {auth}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => updateSearchParams("sortBy", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Plus récents</SelectItem>
            <SelectItem value="oldest">Plus anciens</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full md:w-auto"
        >
          Réinitialiser les filtres
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px] animate-pulse bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Aucun article ne correspond à vos critères.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}; 