'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchAdminDashboard } from '@/services/admin.service';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminOverviewPage() {
  const q = useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: async () => (await fetchAdminDashboard()).data,
  });

  if (q.isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (q.isError || !q.data) {
    return (
      <p className="text-destructive">
        Failed to load dashboard. Ensure you are logged in as admin.
      </p>
    );
  }

  const { stats, pendingReviews } = q.data;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Aggregated stats and pending review queue.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(
          [
            ['Users', stats.totalUsers],
            ['Media', stats.totalMedia],
            ['Reviews (all)', stats.totalReviews],
            ['Published reviews', stats.publishedReviews],
            ['Pending reviews', stats.pendingReviewsCount],
            ['Payments', stats.totalPayments],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-border/80 bg-card/40 p-4"
          >
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Pending reviews</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/moderation">Open moderation</Link>
          </Button>
        </div>
        <ul className="mt-4 space-y-3">
          {pendingReviews.length === 0 && (
            <li className="text-sm text-muted-foreground">
              None — inbox clear.
            </li>
          )}
          {pendingReviews.slice(0, 8).map((r) => (
            <li
              key={r.id}
              className="rounded-lg border border-border/80 bg-background/50 px-4 py-3 text-sm"
            >
              <span className="font-medium">{r.media.title}</span>
              <span className="text-muted-foreground">
                {' '}
                — {r.user.name ?? r.user.email}
              </span>
              <p className="mt-1 line-clamp-2 text-muted-foreground">
                {r.content}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
