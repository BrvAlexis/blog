"use client";

import { memo } from "react";
import { DataType } from "@/types/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export const ArticleCard = memo(({ article }: { article: DataType }) => {
  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
      {article.image && (
        <div className="relative h-72 w-full">
          <Image
            src={article.image}
            alt={article.title}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="secondary">
            {article.category}
          </Badge>
          <time dateTime={article.createdAt}>
            {new Date(article.createdAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>

        <Link href={`/articles/${article.id}`}>
          <h3 className="hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
        </Link>

        <p className="mt-4 line-clamp-3">
          {article.description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span>
            Par {article.authorName}
          </span>

          <Link 
            href={`/articles/${article.id}`}
            className="group inline-flex items-center gap-2 text-blue-600"
          >
            Lire plus
            <span 
              aria-hidden="true" 
              className="block transition-all group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard'; 