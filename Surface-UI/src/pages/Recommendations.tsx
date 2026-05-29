import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { RecommendationsGrid } from "@/components/RecommendationsGrid";
import { addRecentSearch, getRecommendations } from "@/lib/api";

export default function Recommendations() {
  const [params] = useSearchParams();
  const movie = params.get("movie") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendations", movie],
    queryFn: () => getRecommendations(movie),
    enabled: Boolean(movie),
  });

  useEffect(() => {
    if (movie && data && data.length) addRecentSearch(movie);
  }, [movie, data]);

  useEffect(() => {
    document.title = movie
      ? `Movies like ${movie} — CineMatch`
      : "Recommendations — CineMatch";
  }, [movie]);

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back
        </Link>

        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Recommendations for
            </div>
            <h1 className="mt-1 text-3xl font-bold text-foreground md:text-4xl">
              {movie || "—"}
            </h1>
          </div>
          <SearchBar initial={movie} />
        </div>

        {movie ? (
          <RecommendationsGrid
            items={data ?? []}
            isLoading={isLoading}
            error={error as Error | null}
          />
        ) : (
          <div className="py-24 text-center text-muted-foreground">
            Search for a movie to see recommendations.
          </div>
        )}
      </div>
    </main>
  );
}
