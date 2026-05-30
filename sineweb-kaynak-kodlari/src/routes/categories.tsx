import { createFileRoute, Link } from "@tanstack/react-router";
import { Film } from "lucide-react";
import { useSineWeb } from "@/lib/sineweb-data";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Kategoriler — SineWeb" }] }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { categories, movies } = useSineWeb();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Kategoriler</h1>
      <p className="mb-8 text-sm text-muted-foreground">Türlere göre filmleri keşfedin.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = movies.filter((m) => m.CategoryID === c.CategoryID).length;
          return (
            <Link
              key={c.CategoryID}
              to="/movies"
              search={{ category: c.CategoryID }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <Film className="mb-3 h-8 w-8 text-primary" />
              <h2 className="text-xl font-bold group-hover:text-primary">{c.Name}</h2>
              <p className="text-sm text-muted-foreground">{count} film</p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}