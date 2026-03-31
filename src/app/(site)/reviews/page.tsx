import Link from "next/link";
import { serverFetchJson } from "@/lib/server-api";
import type { ReviewFeedItem } from "@/types/review.types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/media/RatingStars";

const qs = (params: Record<string, string | undefined>) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") u.set(k, v);
  }
  const s = u.toString();
  return s ? `?${s}` : "";
};

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    genre?: string;
    platform?: string;
    minRating?: string;
    maxRating?: string;
    page?: string;
  }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const limit = 12;
  const sort =
    sp.sort === "top_rated" || sp.sort === "most_liked"
      ? sp.sort
      : "recent";

  const res = await serverFetchJson<ReviewFeedItem[]>(
    `/api/reviews${qs({
      page: String(page),
      limit: String(limit),
      sort,
      genre: sp.genre,
      platform: sp.platform,
      minRating: sp.minRating,
      maxRating: sp.maxRating,
    })}`,
  );

  const items = res.data;
  const pagination = res.pagination;

  const buildHref = (extra: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { ...sp, ...extra };
    for (const [k, v] of Object.entries(merged)) {
      if (v !== undefined && v !== "") p.set(k, v);
    }
    return `/reviews?${p.toString()}`;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Community reviews</h1>
        <p className="mt-2 text-muted-foreground">
          Published reviews from members. New submissions are moderated before
          they appear here.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {(
          [
            ["recent", "Recent"],
            ["top_rated", "Top rated"],
            ["most_liked", "Most liked"],
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

      <ul className="space-y-6">
        {items.length === 0 && (
          <li className="rounded-lg border border-dashed border-border/80 py-12 text-center text-muted-foreground">
            No published reviews yet.
          </li>
        )}
        {items.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-border/80 bg-card/40 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <Link
                  href={`/media/${r.media.id}`}
                  className="font-semibold text-primary hover:underline"
                >
                  {r.media.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  by {r.user.name ?? "Member"} ·{" "}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </div>
              <RatingStars value={r.rating} />
            </div>
            {r.spoiler && (
              <Badge variant="destructive" className="mt-2">
                Spoilers
              </Badge>
            )}
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">
              {r.content}
            </p>
            {r.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-1">
                {r.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            ) : null}
            <p className="mt-3 text-xs text-muted-foreground">
              {r._count.likes} likes · {r._count.comments} comments
            </p>
          </li>
        ))}
      </ul>

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
