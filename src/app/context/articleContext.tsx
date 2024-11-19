"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebase/configFirebase";
import { Article } from "@/types/article";
import { getArticlesFromFirebase } from "@/firebase/configFirebase";

interface ArticleType {
  title: string;
  description: string;
  category: string;
  image: string;
  authorId: string;
  authorName: string;
  createdAt: string; // ISO string date
}

interface FirebaseContextProps {
  addArticle: (article: ArticleType) => Promise<void>;
  articles: ArticleType[];
  deleteArticle: (id: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(
  undefined
);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await getArticlesFromFirebase();
      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, []);

  const addArticle = async (article: ArticleType) => {
    try {
      await addDoc(collection(firestore, "articles"), {
        ...article,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error: any) {
      console.error("Erreur lors de l'ajout de l'article:", error);
      throw new Error(error.message || "Erreur lors de l'ajout de l'article");
    }
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((article) => article.id !== id));
  };

  return (
    <FirebaseContext.Provider value={{ addArticle, articles, deleteArticle }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextProps => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};
