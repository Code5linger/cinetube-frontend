import Link from "next/link";
import { MediaCard } from "@/components/media/MediaCard";
import { Button } from "@/components/ui/button";
import { getMediaList } from "@/services/media.server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    genre?: string;
    platform?: string;
    year?: string;
    sort?: string;
    minRating?: string;
    page?: string;
    editorsPick?: string;
  }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const limit = 12;

  const sort =
    sp.sort === "top" || sp.sort === "title" || sp.sort === "latest"
      ? sp.sort
      : "latest";

  const res = await getMediaList({
    search: sp.search,
    genre: sp.genre,
    platform: sp.platform,
    year: sp.year,
    sort,
    page,
    limit,
    minRating: sp.minRating,
    editorsPick: sp.editorsPick === "1" || sp.editorsPick === "true",
  });

  const items = res.data;
  const pagination = res.pagination;

  const buildHref = (extra: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { ...sp, ...extra };
    for (const [k, v] of Object.entries(merged)) {
      if (v !== undefined && v !== "") p.set(k, v);
    }
    return `/browse?${p.toString()}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Browse catalog</h1>
        <p className="mt-2 text-muted-foreground">
          Filter by genre, platform, year, and rating. Sort by newest or
          highest rated.
        </p>
      </div>

      <form
        className="mb-8 grid gap-4 rounded-xl border border-border/80 bg-card/40 p-4 md:grid-cols-2 lg:grid-cols-4"
        action="/browse"
        method="GET"
      >
        <div className="space-y-2 lg:col-span-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            name="search"
            placeholder="Title, director, cast…"
            defaultValue={sp.search}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            name="genre"
            placeholder="e.g. Drama"
            defaultValue={sp.genre}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Input
            id="platform"
            name="platform"
            placeholder="e.g. Netflix"
            defaultValue={sp.platform}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Release year</Label>
          <Input id="year" name="year" placeholder="2024" defaultValue={sp.year} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="minRating">Min rating</Label>
          <Input
            id="minRating"
            name="minRating"
            placeholder="7"
            defaultValue={sp.minRating}
          />
        </div>
        <input type="hidden" name="sort" value={sort} />
        <input type="hidden" name="editorsPick" value={sp.editorsPick ?? ""} />
        <div className="flex items-end gap-2 md:col-span-2">
          <Button type="submit" className="w-full sm:w-auto">
            Apply filters
          </Button>
          <Button variant="outline" type="button" asChild>
            <Link href="/browse">Reset</Link>
          </Button>
        </div>
      </form>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {pagination
            ? `${pagination.total} titles · page ${pagination.page} of ${pagination.totalPages}`
            : null}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          {(
            [
              ["latest", "Newest"],
              ["top", "Top rated"],
              ["title", "A–Z"],
            ] as const
          ).map(([value, label]) => (
            <Button
              key={value}
              variant={sort === value ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={buildHref({ sort: value, page: "1" })}>{label}</Link>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">
            No titles match your filters.
          </p>
        )}
        {items.map((m) => (
          <MediaCard key={m.id} media={m} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          <Button variant="outline" disabled={pagination.page <= 1} asChild>
            <Link
              href={buildHref({
                page: String(Math.max(1, pagination.page - 1)),
              })}
            >
              Previous
            </Link>
          </Button>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            asChild
          >
            <Link
              href={buildHref({
                page: String(
                  Math.min(pagination.totalPages, pagination.page + 1),
                ),
              })}
            >
              Next
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
