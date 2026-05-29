import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { RecentSearches } from "@/components/RecentSearches";

export default function Search() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-4 py-10">
      <div className="w-full max-w-2xl">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back
        </Link>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center w-full">
        <h1 className="mb-3 text-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Search a <span className="text-primary">movie</span>
        </h1>
        <p className="mb-10 max-w-xl text-center text-muted-foreground">
          Enter a title and hit Get Recommendations.
        </p>
        <SearchBar />
        <RecentSearches />
      </div>
    </main>
  );
}
