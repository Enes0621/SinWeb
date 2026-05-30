import { Link } from "@tanstack/react-router";
import { Calendar, Star } from "lucide-react";
import type { Movie } from "@/lib/sineweb-data";
import { useSineWeb } from "@/lib/sineweb-data";

export function MovieCard({ movie }: { movie: Movie }) {
  const { categories, comments } = useSineWeb();
  const category = categories.find((c) => c.CategoryID === movie.CategoryID);
  const movieComments = comments.filter((c) => c.MovieID === movie.MovieID);
  const avg = movieComments.length
    ? (movieComments.reduce((a, c) => a + c.Rating, 0) / movieComments.length).toFixed(1)
    : "—";

  return (
    <Link
      to="/movies/$movieId"
      params={{ movieId: String(movie.MovieID) }}
      className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={movie.Poster}
          alt={movie.Title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold">{movie.Title}</h3>
          <span className="inline-flex items-center gap-1 text-xs text-primary">
            <Star className="h-3 w-3 fill-primary" /> {avg}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded bg-secondary px-2 py-0.5">{category?.Name}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{movie.ReleaseYear}</span>
        </div>
      </div>
    </Link>
  );
}