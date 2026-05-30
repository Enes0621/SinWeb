import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { useSineWeb } from "@/lib/sineweb-data";
import { MovieCard } from "@/components/MovieCard";
import { Input } from "@/components/ui/input";

type MoviesSearch = { q?: string; category?: number };

export const Route = createFileRoute("/movies")({
  head: () => ({ meta: [{ title: "Filmler — SineWeb" }, { name: "description", content: "Tüm filmleri keşfedin." }] }),
  validateSearch: (s: Record<string, unknown>): MoviesSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "number" ? s.category : s.category ? Number(s.category) : undefined,
  }),
  component: MoviesPage,
});

function MoviesPage() {
  const { movies, categories } = useSineWeb();
  const search = useSearch({ from: "/movies" });
  const [q, setQ] = useState(search.q ?? "");

  const filtered = movies.filter((m) => {
    const matchesQ = !q || m.Title.toLowerCase().includes(q.toLowerCase());
    const matchesCat = !search.category || m.CategoryID === search.category;
    return matchesQ && matchesCat;
  });

  const activeCat = categories.find((c) => c.CategoryID === search.category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Filmler</h1>
          <p className="text-sm text-muted-foreground">
            {activeCat ? `${activeCat.Name} kategorisinde ` : ""}{filtered.length} film listeleniyor
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Film ara..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[200px_1fr]">
        <aside>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">Kategoriler</h2>
          <ul className="space-y-1">
            <li>
              <Link to="/movies" search={{}} className={`block rounded px-3 py-2 text-sm hover:bg-secondary ${!search.category ? "bg-secondary text-primary" : ""}`}>
                Tümü
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.CategoryID}>
                <Link
                  to="/movies"
                  search={{ category: c.CategoryID }}
                  className={`block rounded px-3 py-2 text-sm hover:bg-secondary ${search.category === c.CategoryID ? "bg-secondary text-primary" : ""}`}
                >
                  {c.Name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <section>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground">
              Aradığınız kriterlere uygun film bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((m) => <MovieCard key={m.MovieID} movie={m} />)}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}