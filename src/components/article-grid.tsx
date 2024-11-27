import { useState } from "react";
import { ArticleCard } from "@/components/article-card";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/pagination";
import { DataType } from "@/types/types";

interface ArticleGridProps {
  articles: DataType[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ArticleGrid = ({ articles, totalPages, currentPage, onPageChange }: ArticleGridProps) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Articles & news</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Découvrez Nos Articles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explorez notre collection d'articles sur la santé et la longévité
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </section>
  );
}; 