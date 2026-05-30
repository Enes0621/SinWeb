import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Star, Plus, Check, MessageSquare, LogIn } from "lucide-react";
import { useSineWeb, useCurrentUser } from "@/lib/sineweb-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/movies/$movieId")({
  head: () => ({ meta: [{ title: "Film Detayı — SineWeb" }] }),
  component: MovieDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Film bulunamadı</h1>
      <Link to="/movies" className="mt-4 inline-block text-primary underline">Filmlere dön</Link>
    </main>
  ),
});

function MovieDetail() {
  const { movieId } = Route.useParams();
  const id = Number(movieId);
  const db = useSineWeb();
  const user = useCurrentUser();
  const movie = db.movies.find((m) => m.MovieID === id);
  if (!movie) throw notFound();

  const category = db.categories.find((c) => c.CategoryID === movie.CategoryID);
  const movieComments = db.comments.filter((c) => c.MovieID === id);
  const avg = movieComments.length ? (movieComments.reduce((a, c) => a + c.Rating, 0) / movieComments.length).toFixed(1) : "—";

  const userWatchlist = user ? db.watchlists.find((w) => w.UserID === user.UserID) : null;
  const inWatchlist = !!userWatchlist && db.watchlistDetails.some((d) => d.WatchlistID === userWatchlist.WatchlistID && d.MovieID === id);

  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    db.addComment(id, text.trim(), rating);
    setText("");
    setRating(5);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <img src={movie.Poster} alt={movie.Title} className="w-full rounded-xl border border-border object-cover" />
        <div className="space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">{category?.Name}</span>
            <h1 className="mt-1 text-4xl font-bold">{movie.Title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{movie.ReleaseYear}</span>
            <span className="inline-flex items-center gap-1"><Star className="h-4 w-4 fill-primary text-primary" />{avg} / 5</span>
            <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" />{movieComments.length} yorum</span>
          </div>
          <p className="leading-relaxed text-foreground/90">{movie.Description}</p>

          {user ? (
            inWatchlist ? (
              <Button variant="outline" onClick={() => db.removeFromWatchlist(id)}>
                <Check className="mr-1 h-4 w-4" /> Listede — Kaldır
              </Button>
            ) : (
              <Button onClick={() => db.addToWatchlist(id)}>
                <Plus className="mr-1 h-4 w-4" /> İzleme Listesine Ekle
              </Button>
            )
          ) : (
            <Button variant="outline" disabled>
              <LogIn className="mr-1 h-4 w-4" /> Eklemek için giriş yapın
            </Button>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Yorumlar</h2>

        {user ? (
          <form onSubmit={submit} className="mb-6 space-y-3 rounded-lg border border-border bg-card p-4">
            <Textarea
              placeholder="Bu film hakkında düşüncelerinizi paylaşın..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              maxLength={500}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="mr-2 text-sm text-muted-foreground">Puan:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setRating(n)}
                    className="p-1"
                    aria-label={`${n} yıldız`}
                  >
                    <Star className={`h-5 w-5 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
              <Button type="submit" disabled={!text.trim()}>Yorum Gönder</Button>
            </div>
          </form>
        ) : (
          <div className="mb-6 rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
            Yorum yapabilmek için lütfen <span className="font-semibold text-foreground">giriş yapın</span>.
          </div>
        )}

        <div className="space-y-3">
          {movieComments.length === 0 && (
            <p className="text-sm text-muted-foreground">Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
          )}
          {movieComments.map((c) => {
            const u = db.users.find((x) => x.UserID === c.UserID);
            return (
              <article key={c.CommentID} className="rounded-lg border border-border bg-card p-4">
                <header className="mb-2 flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{u?.FirstName} {u?.LastName}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{c.Date}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`h-4 w-4 ${n <= c.Rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                    ))}
                  </div>
                </header>
                <p className="text-sm text-foreground/90">{c.Text}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}