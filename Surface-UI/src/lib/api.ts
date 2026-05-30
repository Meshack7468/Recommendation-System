const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://recommendation-system-production-2d81.up.railway.app";

function base() {
  return API_URL.replace(/\/$/, "");
}

// GET ALL MOVIES
export async function getMovies(): Promise<string[]> {
  const res = await fetch(`${base()}/movies`);

  if (!res.ok) {
    throw new Error(`Failed to load movies (${res.status})`);
  }

  const data = await res.json();

  // Supports:
  // ["Movie1", "Movie2"]
  // or
  // { movies: [...] }

  if (Array.isArray(data)) {
    return data as string[];
  }

  return (data as { movies?: string[] }).movies ?? [];
}


// GET RECOMMENDATIONS

export async function getRecommendations(
  movie: string,
): Promise<string[]> {
  const res = await fetch(`${base()}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie }),
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  const data = (await res.json()) as {
    recommendations?: string[];
  };

  return data.recommendations ?? [];
}


// RECENT SEARCHES

const RECENT_KEY = "recent_movie_searches";

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(movie: string) {
  if (typeof window === "undefined") return;

  const current = getRecentSearches().filter(
    (m) => m.toLowerCase() !== movie.toLowerCase(),
  );

  const next = [movie, ...current].slice(0, 5);

  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}