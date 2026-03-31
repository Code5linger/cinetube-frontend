'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  approveComment,
  approveReview,
  deleteCommentAdmin,
  deleteReviewAdmin,
  unpublishComment,
  unpublishReview,
} from '@/services/admin.service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { clientFetchJson } from '@/lib/client-api';
import type { ReviewFeedItem } from '@/types/review.types';

interface PendingComment {
  id: string;
  content: string;
  createdAt: string;
  user: { id: string; name: string | null; email?: string };
  review: { id: string };
}

export default function AdminModerationPage() {
  const qc = useQueryClient();

  const reviewsQ = useQuery({
    queryKey: ['admin', 'reviews', 'pending'],
    queryFn: async () =>
      (await clientFetchJson<ReviewFeedItem[]>('/api/reviews/pending')).data,
  });

  const commentsQ = useQuery({
    queryKey: ['admin', 'comments', 'pending'],
    queryFn: async () =>
      (await clientFetchJson<PendingComment[]>('/api/admin/comments/pending'))
        .data,
  });

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['admin'] });
    qc.invalidateQueries({ queryKey: ['reviews'] });
  };

  const mRev = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string;
      action: 'approve' | 'unpublish' | 'delete';
    }) => {
      if (action === 'approve') await approveReview(id);
      else if (action === 'unpublish') await unpublishReview(id);
      else await deleteReviewAdmin(id);
    },
    onSuccess: () => {
      toast.success('Updated');
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const mCom = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: string;
      action: 'approve' | 'unpublish' | 'delete';
    }) => {
      if (action === 'approve') await approveComment(id);
      else if (action === 'unpublish') await unpublishComment(id);
      else await deleteCommentAdmin(id);
    },
    onSuccess: () => {
      toast.success('Updated');
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Moderation</h1>
      <p className="mt-2 text-muted-foreground">
        Approve or remove reviews and comments before they appear publicly.
      </p>

      {/* ── Pending reviews ── */}
      <section className="mt-10">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Pending reviews</h2>
          {!reviewsQ.isLoading && (
            <Badge
              variant={
                (reviewsQ.data?.length ?? 0) > 0 ? 'destructive' : 'outline'
              }
            >
              {reviewsQ.data?.length ?? 0}
            </Badge>
          )}
        </div>

        {reviewsQ.isLoading ? (
          <Loader2 className="mt-4 size-6 animate-spin text-muted-foreground" />
        ) : (
          <ul className="mt-4 space-y-4">
            {(reviewsQ.data ?? []).length === 0 && (
              <li className="rounded-xl border border-border/80 px-4 py-8 text-center text-sm text-muted-foreground">
                No pending reviews — inbox clear.
              </li>
            )}
            {(reviewsQ.data ?? []).map((r) => (
              <li
                key={r.id}
                className="rounded-xl border border-border/80 bg-card/40 p-4"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/media/${r.media.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {r.media.title}
                  </Link>
                  <Badge variant="outline">★ {r.rating}/10</Badge>
                  {r.spoiler && <Badge variant="secondary">Spoiler</Badge>}
                  {r.tags.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  by {r.user.name ?? r.user.email} ·{' '}
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed">
                  {r.content}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {r._count.likes} likes · {r._count.comments} comments
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={mRev.isPending}
                    onClick={() => mRev.mutate({ id: r.id, action: 'approve' })}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={mRev.isPending}
                    onClick={() =>
                      mRev.mutate({ id: r.id, action: 'unpublish' })
                    }
                  >
                    Unpublish
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={mRev.isPending}
                    onClick={() => {
                      if (confirm('Delete this review permanently?'))
                        mRev.mutate({ id: r.id, action: 'delete' });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── Pending comments ── */}
      <section className="mt-12">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Pending comments</h2>
          {!commentsQ.isLoading && (
            <Badge
              variant={
                (commentsQ.data?.length ?? 0) > 0 ? 'destructive' : 'outline'
              }
            >
              {commentsQ.data?.length ?? 0}
            </Badge>
          )}
        </div>

        {commentsQ.isLoading ? (
          <Loader2 className="mt-4 size-6 animate-spin text-muted-foreground" />
        ) : (
          <ul className="mt-4 space-y-4">
            {(commentsQ.data ?? []).length === 0 && (
              <li className="rounded-xl border border-border/80 px-4 py-8 text-center text-sm text-muted-foreground">
                No pending comments.
              </li>
            )}
            {(commentsQ.data ?? []).map((c) => (
              <li
                key={c.id}
                className="rounded-xl border border-border/80 bg-card/40 p-4"
              >
                <p className="text-sm font-medium">
                  {c.user.name ?? c.user.email}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed">{c.content}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    disabled={mCom.isPending}
                    onClick={() => mCom.mutate({ id: c.id, action: 'approve' })}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={mCom.isPending}
                    onClick={() =>
                      mCom.mutate({ id: c.id, action: 'unpublish' })
                    }
                  >
                    Unpublish
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={mCom.isPending}
                    onClick={() => {
                      if (confirm('Delete this comment permanently?'))
                        mCom.mutate({ id: c.id, action: 'delete' });
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
