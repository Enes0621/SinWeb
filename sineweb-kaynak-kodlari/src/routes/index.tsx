import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useSineWeb } from "@/lib/sineweb-data";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Star, Sparkles, Flame } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SineWeb — Anasayfa" },
      { name: "description", content: "Sinema dünyasının nabzını SineWeb'de tutun." },
      { property: "og:title", content: "SineWeb — Anasayfa" },
      { property: "og:description", content: "Sinema dünyasının nabzını SineWeb'de tutun." },
    ],
  }),
  component: Index,
});

function Index() {
  const { movies, categories, comments, users } = useSineWeb();
  const featured = movies[0];
  const featuredCategory = categories.find((c) => c.CategoryID === featured.CategoryID);
  const movieOfTheWeek = movies[3];
  const suggestions = movies.slice(5, 9);
  const recentReviews = [...comments].sort((a, b) => b.Date.localeCompare(a.Date)).slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      {/* Featured */}
      <section className="relative mb-12 overflow-hidden rounded-2xl border border-border">
        <img src={featured.Poster} alt={featured.Title} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative grid gap-6 p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Flame className="h-3 w-3" /> Öne Çıkan Film
            </span>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{featured.Title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{featured.ReleaseYear}</span>
              <span className="rounded bg-secondary px-2 py-0.5">{featuredCategory?.Name}</span>
            </div>
            <p className="text-base text-muted-foreground md:text-lg">{featured.Description}</p>
            <Button asChild size="lg">
              <Link to="/movies/$movieId" params={{ movieId: String(featured.MovieID) }}>Detayları Gör</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div className="space-y-10">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Popüler Filmler</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {movies.slice(0, 8).map((m) => <MovieCard key={m.MovieID} movie={m} />)}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold">Son Yorumlar</h2>
            <div className="space-y-3">
              {recentReviews.map((c) => {
                const movie = movies.find((m) => m.MovieID === c.MovieID);
                const user = users.find((u) => u.UserID === c.UserID);
                return (
                  <Link
                    key={c.CommentID}
                    to="/movies/$movieId"
                    params={{ movieId: String(c.MovieID) }}
                    className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <span className="font-semibold">{user?.FirstName} {user?.LastName}</span>
                        <span className="text-muted-foreground"> — {movie?.Title}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-primary">
                        <Star className="h-4 w-4 fill-primary" /> {c.Rating}/5
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.Text}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* Aside */}
        <aside className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4" /> Haftanın Filmi
            </h3>
            <MovieCard movie={movieOfTheWeek} />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary">
              Bunları da Sevebilirsiniz
            </h3>
            <ul className="space-y-3">
              {suggestions.map((m) => (
                <li key={m.MovieID}>
                  <Link to="/movies/$movieId" params={{ movieId: String(m.MovieID) }} className="flex gap-3 group">
                    <img src={m.Poster} alt={m.Title} className="h-16 w-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:text-primary">{m.Title}</p>
                      <p className="text-xs text-muted-foreground">{m.ReleaseYear}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
