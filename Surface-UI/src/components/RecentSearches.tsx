import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { getRecentSearches } from "@/lib/api";

export function RecentSearches() {
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    setItems(getRecentSearches());
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-12 w-full max-w-2xl">
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" /> Recent searches
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((m) => (
          <Link
            key={m}
            to={`/recommendations?movie=${encodeURIComponent(m)}`}
            className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-foreground transition hover:border-primary hover:text-primary"
          >
            {m}
          </Link>
        ))}
      </div>
    </div>
  );
}
