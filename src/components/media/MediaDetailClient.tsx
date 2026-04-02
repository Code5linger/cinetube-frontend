'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, ListPlus, ListMinus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from '@/hooks/useSession';
import {
  addToWatchlist,
  fetchWatchlist,
  removeFromWatchlist,
} from '@/services/watchlist.service';
import {
  createReview,
  deleteReview,
  postComment,
  toggleLikeReview,
  updateReview,
} from '@/services/review.service';
import {
  approveReview as adminApproveReview,
  deleteReviewAdmin,
  unpublishReview as adminUnpublishReview,
} from '@/services/admin.service';
import type { MediaDetail } from '@/types/media.types';
import { RatingStars } from '@/components/media/RatingStars';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function toYouTubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const id = u.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
      const p = u.pathname.split('/').filter(Boolean);
      if (p[0] === 'embed' && p[1]) return url;
    }
    if (u.hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export function MediaDetailClient({ media }: { media: MediaDetail }) {
  const { data: user } = useSession();
  const qc = useQueryClient();
  const router = useRouter();

  const { data: watchlistData } = useQuery({
    queryKey: ['watchlist'],
    queryFn: async () => (await fetchWatchlist()).data,
    enabled: Boolean(user),
  });

  const onWatchlist = useMemo(
    () => watchlistData?.some((w) => w.media.id === media.id) ?? false,
    [watchlistData, media.id],
  );

  const userReview = media.reviews.find(
    (r) => r != null && r.user?.id === user?.id,
  );

  const visibleReviews = media.reviews.filter(
    (r) => r != null && (r.isPublished || r.user?.id === user?.id),
  );

  const likeMutation = useMutation({
    mutationFn: (reviewId: string) => toggleLikeReview(reviewId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['session', 'me'] });
      router.refresh();
      toast.success('Updated');
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const watchToggle = useMutation({
    mutationFn: async () => {
      if (onWatchlist) await removeFromWatchlist(media.id);
      else await addToWatchlist(media.id);
      await qc.invalidateQueries({ queryKey: ['watchlist'] });
    },
    onSuccess: () => toast.success('Watchlist updated'),
    onError: (e: Error) => toast.error(e.message),
  });

  const [reviewRating, setReviewRating] = useState('8');
  const [reviewBody, setReviewBody] = useState('');
  const [spoiler, setSpoiler] = useState(false);
  const [tags, setTags] = useState('');

  const submitReview = useMutation({
    mutationFn: () =>
      createReview({
        mediaId: media.id,
        rating: Number(reviewRating),
        content: reviewBody,
        spoiler,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      toast.success('Review submitted — pending moderation');
      setReviewBody('');
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const embed = media.streamUrl ? toYouTubeEmbed(media.streamUrl) : null;

  return (
    <div className="space-y-10">
      {media.streamUrl && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Watch</h2>
          {embed ? (
            <div className="aspect-video overflow-hidden rounded-xl border border-border/80 bg-black">
              <iframe
                title="Stream"
                src={embed}
                className="size-full"
                allowFullScreen
              />
            </div>
          ) : (
            <Button variant="link" className="px-0" asChild>
              <a href={media.streamUrl} target="_blank" rel="noreferrer">
                Open streaming link
              </a>
            </Button>
          )}
        </section>
      )}

      {user && (
        <section>
          <Button
            variant="secondary"
            disabled={watchToggle.isPending}
            onClick={() => watchToggle.mutate()}
          >
            {watchToggle.isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : onWatchlist ? (
              <>
                <ListMinus className="size-4" /> Remove from watchlist
              </>
            ) : (
              <>
                <ListPlus className="size-4" /> Add to watchlist
              </>
            )}
          </Button>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-lg font-semibold">Reviews</h2>
        {user && !userReview && (
          <div className="mb-8 space-y-4 rounded-xl border border-border/80 bg-card/40 p-4">
            <p className="text-sm text-muted-foreground">
              Write a review (1–10). It will be published after admin approval.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1–10)</Label>
                <Input
                  id="rating"
                  type="number"
                  min={1}
                  max={10}
                  value={reviewRating}
                  onChange={(e) => setReviewRating(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={spoiler}
                    onChange={(e) => setSpoiler(e.target.checked)}
                  />
                  Contains spoilers
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="classic, underrated"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Review</Label>
              <Textarea
                id="content"
                rows={4}
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
                placeholder="What did you think?"
              />
            </div>
            <Button
              disabled={submitReview.isPending || !reviewBody.trim()}
              onClick={() => submitReview.mutate()}
            >
              {submitReview.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Submit review
            </Button>
          </div>
        )}

        {user && userReview && !userReview.isPublished && (
          <UnpublishedReviewEditor
            review={userReview}
            onSaved={() => router.refresh()}
          />
        )}

        <ul className="space-y-6">
          {visibleReviews.length === 0 && (
            <li className="text-sm text-muted-foreground">
              No published reviews yet.
            </li>
          )}
          {visibleReviews.map((r) => {
            if (!r || !r.likes || !r.comments) return null;
            const liked = user && r.likes.some((l) => l.userId === user.id);
            return (
              <li
                key={r.id}
                className="rounded-xl border border-border/80 bg-background/50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{r.user.name ?? 'Member'}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <RatingStars value={r.rating} />
                </div>
                {r.spoiler && (
                  <Badge variant="destructive" className="mt-2">
                    Spoilers
                  </Badge>
                )}
                <p className="mt-3 text-sm leading-relaxed">{r.content}</p>
                {r.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {user ? (
                    <Button
                      variant={liked ? 'default' : 'outline'}
                      size="sm"
                      disabled={likeMutation.isPending}
                      onClick={() => likeMutation.mutate(r.id)}
                    >
                      <Heart
                        className={`size-4 ${liked ? 'fill-current' : ''}`}
                      />
                      {r.likes.length} likes
                    </Button>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      <Link href="/login" className="underline">
                        Log in
                      </Link>{' '}
                      to like
                    </p>
                  )}
                </div>

                {r.comments.length > 0 && (
                  <ul className="mt-4 space-y-2 border-l-2 border-border pl-4">
                    {r.comments.map((c) => (
                      <li key={c.id} className="text-sm">
                        <span className="font-medium">
                          {c.user.name ?? 'Member'}
                        </span>
                        <span className="text-muted-foreground">
                          {' '}
                          · {new Date(c.createdAt).toLocaleDateString()}
                        </span>
                        <p className="mt-1 text-foreground/90">{c.content}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {user && (
                  <CommentBox
                    reviewId={r.id}
                    onPosted={() => router.refresh()}
                  />
                )}

                {user?.role === 'ADMIN' && (
                  <AdminReviewBar
                    reviewId={r.id}
                    onDone={() => router.refresh()}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function CommentBox({
  reviewId,
  onPosted,
}: {
  reviewId: string;
  onPosted: () => void;
}) {
  const [content, setContent] = useState('');
  const m = useMutation({
    mutationFn: () => postComment(reviewId, { content }),
    onSuccess: () => {
      toast.success('Comment submitted — pending moderation');
      setContent('');
      onPosted();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mt-4 space-y-2">
      <Separator />
      <Label htmlFor={`c-${reviewId}`}>Add a comment</Label>
      <Textarea
        id={`c-${reviewId}`}
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        size="sm"
        disabled={m.isPending || !content.trim()}
        onClick={() => m.mutate()}
      >
        {m.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        Post
      </Button>
    </div>
  );
}

function AdminReviewBar({
  reviewId,
  onDone,
}: {
  reviewId: string;
  onDone: () => void;
}) {
  const m = useMutation({
    mutationFn: async (action: 'approve' | 'unpublish' | 'delete') => {
      if (action === 'approve') await adminApproveReview(reviewId);
      else if (action === 'unpublish') await adminUnpublishReview(reviewId);
      else await deleteReviewAdmin(reviewId);
    },
    onSuccess: (_, action) => {
      toast.success(action === 'delete' ? 'Review deleted' : 'Review updated');
      onDone();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mt-4 flex flex-wrap gap-2 rounded-md border border-dashed border-primary/40 bg-primary/5 p-3">
      <span className="w-full text-xs font-medium text-primary">Admin</span>
      <Button
        size="sm"
        variant="secondary"
        disabled={m.isPending}
        onClick={() => m.mutate('approve')}
      >
        Approve
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={m.isPending}
        onClick={() => m.mutate('unpublish')}
      >
        Unpublish
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={m.isPending}
        onClick={() => m.mutate('delete')}
      >
        Delete
      </Button>
    </div>
  );
}

function UnpublishedReviewEditor({
  review,
  onSaved,
}: {
  review: MediaDetail['reviews'][number];
  onSaved: () => void;
}) {
  const [rating, setRating] = useState(String(review.rating));
  const [content, setContent] = useState(review.content);
  const [spoiler, setSpoiler] = useState(review.spoiler);
  const [tags, setTags] = useState(review.tags.join(', '));

  const save = useMutation({
    mutationFn: () =>
      updateReview(review.id, {
        rating: Number(rating),
        content,
        spoiler,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }),
    onSuccess: () => {
      toast.success('Review updated');
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: () => deleteReview(review.id),
    onSuccess: () => {
      toast.success('Review deleted');
      onSaved();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="mb-8 space-y-3 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
      <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
        Your review is not published yet — you can still edit or delete it.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Rating</Label>
          <Input
            type="number"
            min={1}
            max={10}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
          />
          Spoilers
        </label>
      </div>
      <div className="space-y-2">
        <Label>Tags</Label>
        <Input value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Content</Label>
        <Textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button disabled={save.isPending} onClick={() => save.mutate()}>
          Save changes
        </Button>
        <Button
          variant="destructive"
          disabled={del.isPending}
          onClick={() => del.mutate()}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
