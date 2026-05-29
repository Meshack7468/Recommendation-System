import { Loader2 } from "lucide-react";
import { MovieCard } from "./MovieCard";

export function RecommendationsGrid({
  items,
  isLoading,
  error,
}: {
  items: string[];
  isLoading: boolean;
  error?: Error | null;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="mr-2 size-6 animate-spin text-primary" />
        Finding similar movies...
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive-foreground">
        {error.message}
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="py-24 text-center text-muted-foreground">No results found.</div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
      {items.map((title) => (
        <MovieCard key={title} title={title} />
      ))}
    </div>
  );
}
