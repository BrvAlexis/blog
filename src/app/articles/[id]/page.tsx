import { Suspense } from "react";
import { ArticleContent } from "./article-content";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto w-full p-4">
          <Skeleton className="h-8 w-24 mb-10" />
          <Skeleton className="h-[400px] w-full mb-6" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      }
    >
      <ArticleContent id={params.id} />
    </Suspense>
  );
}
