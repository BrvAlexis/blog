"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/configFirebase";
import { useAuth } from "@/hooks/useAuth";
import { DataType, DbContextType } from "@/types/types";

const ArticleContext = createContext<DbContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
};

export const ArticleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [articles, setArticles] = useState<DataType[]>([]);
  const { user } = useAuth();
  const authorId = user?.uid as string;

  useEffect(() => {
    if (!authorId) return;
    const q = query(
      collection(db, "articles"),
      where("authorId", "==", authorId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: DataType[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as DataType);
      });
      setArticles(data);
    });
    return () => unsubscribe();
  }, [authorId]);

  const addArticle = async (
    articleData: Omit<DataType, "id"> & { image: string }
  ) => {
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        ...articleData,
        authorId,
      });
      const newArticle: DataType = {
        id: docRef.id,
        ...articleData,
        authorId,
      };
      setArticles([...articles, newArticle]);
      return newArticle;
    } catch (error) {
      console.error("Error adding article: ", error);
      throw error;
    }
  };

  const updateArticle = async (article: DataType) => {
    try {
      await updateDoc(doc(db, "articles", article.id), article);
    } catch (error) {
      console.error("Error updating article: ", error);
      throw error;
    }
  };
};
