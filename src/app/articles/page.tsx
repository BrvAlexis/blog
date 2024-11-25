import { Suspense } from "react";
import { ArticlesWithFilters } from "./articles-with-filters";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-4">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      }
    >
      <ArticlesWithFilters />
    </Suspense>
  );
} 