import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { getMovies } from "@/lib/api";

export function SearchBar({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: movies = [], isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
    staleTime: 5 * 60 * 1000,
  });

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    const starts: string[] = [];
    const contains: string[] = [];
    for (const m of movies) {
      const lower = m.toLowerCase();
      if (lower.startsWith(q)) starts.push(m);
      else if (lower.includes(q)) contains.push(m);
      if (starts.length >= 15) break;
    }
    return [...starts, ...contains].slice(0, 12);
  }, [value, movies]);

  useEffect(() => {
    setHighlight(0);
  }, [value]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const select = (movie: string) => {
    setValue(movie);
    setOpen(false);
    navigate(`/recommendations?movie=${encodeURIComponent(movie)}`);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const movie = (suggestions[highlight] ?? value).trim();
    if (!movie) return;
    select(movie);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || !suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <form onSubmit={submit} className="flex w-full gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={isLoading ? "Loading movies..." : "Search a movie title..."}
            disabled={isLoading || Boolean(error)}
            role="combobox"
            aria-expanded={open}
            aria-autocomplete="list"
            className="h-12 w-full rounded-md border border-border bg-card pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:opacity-60"
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
        </div>
        <button
          type="submit"
          className="h-12 rounded-md bg-primary px-6 font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
          disabled={!value.trim()}
        >
          Get Recommendations
        </button>
      </form>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-xs text-destructive">
          <AlertCircle className="size-3.5" /> Could not load movie list.
        </div>
      )}

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 mt-2 max-h-80 w-full overflow-auto rounded-md border border-border bg-card shadow-xl animate-in fade-in-0 zoom-in-95"
        >
          {suggestions.map((m, i) => (
            <li
              key={m}
              role="option"
              aria-selected={i === highlight}
              onMouseEnter={() => setHighlight(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                select(m);
              }}
              className={`cursor-pointer px-4 py-2.5 text-sm transition ${
                i === highlight
                  ? "bg-primary/15 text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {m}
            </li>
          ))}
        </ul>
      )}

      {open && !isLoading && !error && value.trim() && suggestions.length === 0 && (
        <div className="absolute z-20 mt-2 w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground shadow-xl">
          No results found.
        </div>
      )}
    </div>
  );
}
