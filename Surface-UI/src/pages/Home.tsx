import { Link } from "react-router-dom";
import { Film, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        <Sparkles className="size-3.5" /> AI Powered
      </div>
      <h1 className="mb-4 text-center text-5xl font-bold tracking-tight text-foreground md:text-6xl">
        Find your next <span className="text-primary">favorite</span> movie
      </h1>
      <p className="mb-10 max-w-xl text-center text-muted-foreground">
        Enter a movie you love and find similar ones you'll enjoy —
        powered by content similarity.
      </p>
      <Link
        to="/search"
        className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-8 font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-[0.98]"
      >
        <Film className="size-5" /> Discover Now
      </Link>
    </main>
  );
}
