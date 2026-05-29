import { Film } from "lucide-react";

export function MovieCard({ title }: { title: string }) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:border-primary/60 hover:shadow-[0_10px_40px_-10px_rgba(229,9,20,0.5)]">
      <div className="flex aspect-[2/3] items-center justify-center bg-gradient-to-br from-muted to-background">
        <Film className="size-16 text-muted-foreground/40 transition group-hover:text-primary/70" />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">Similar based on content</p>
      </div>
    </div>
  );
}
