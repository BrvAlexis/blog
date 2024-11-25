"use client";

import { memo } from "react";
import { DataType } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export const ArticleCard = memo(({ article }: { article: DataType }) => {
  return (
    <Link href={`/articles/${article.id}`} className="group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300">
        {article.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              layout="fill"
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