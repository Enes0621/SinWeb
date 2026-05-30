import { createFileRoute, Link } from "@tanstack/react-router";
import { useSineWeb, useCurrentUser } from "@/lib/sineweb-data";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/watchlist")({
  head: () => ({ meta: [{ title: "İzleme Listem — SineWeb" }] }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const db = useSineWeb();
  const user = useCurrentUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">İzleme listesini görmek için giriş yapın</h1>
        <Button className="mt-4" onClick={db.openAuth}>Giriş Yap</Button>
      </main>
    );
  }

  const wl = db.watchlists.find((w) => w.UserID === user.UserID);
  const items = wl ? db.watchlistDetails.filter((d) => d.WatchlistID === wl.WatchlistID) : [];
  const movies = items.map((d) => db.movies.find((m) => m.MovieID === d.MovieID)!).filter(Boolean);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">İzleme Listem</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        {user.FirstName} {user.LastName} — {movies.length} film
      </p>
      {movies.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="mb-4 text-muted-foreground">İzleme listeniz boş.</p>
          <Button asChild><Link to="/movies">Film Keşfet</Link></Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {movies.map((m) => <MovieCard key={m.MovieID} movie={m} />)}
        </div>
      )}
    </main>
  );
}