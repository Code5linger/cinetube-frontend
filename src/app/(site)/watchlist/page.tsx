"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { MediaCard } from "@/components/media/MediaCard";
import { Button } from "@/components/ui/button";
import { fetchWatchlist } from "@/services/watchlist.service";
import { useSession } from "@/hooks/useSession";

export default function WatchlistPage() {
  const { data: user, isPending: sessionLoading } = useSession();
  const q = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => (await fetchWatchlist()).data,
    enabled: Boolean(user),
  });

  if (sessionLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Watchlist</h1>
        <p className="mt-2 text-muted-foreground">
          Log in to save titles and sync across devices.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/login?redirect=/watchlist">Log in</Link>
        </Button>
      </div>
    );
  }

  if (q.isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const items = q.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Your watchlist</h1>
      <p className="mt-2 text-muted-foreground">
        Titles you&apos;ve saved for later.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.length === 0 && (
          <p className="col-span-full py-12 text-center text-muted-foreground">
            Nothing here yet — add titles from any movie or series page.
          </p>
        )}
        {items.map((row) => (
          <MediaCard key={row.id} media={row.media} />
        ))}
      </div>
    </div>
  );
}
