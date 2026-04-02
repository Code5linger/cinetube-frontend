import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MediaDetailClient } from '@/components/media/MediaDetailClient';
import { TitlePurchaseButtons } from '@/components/media/TitlePurchaseButtons';
import { getMediaById } from '@/services/media.server';
import { notFound } from 'next/navigation';

export default async function MediaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let media;
  try {
    const res = await getMediaById(id);
    media = res.data;
    console.log('reviews count:', media.reviews?.length);
    console.log('first review:', JSON.stringify(media.reviews?.[0]));
  } catch (e) {
    console.error('getMediaById failed:', e);
    notFound();
  }

  const img = media.posterUrl ?? media.thumbnailUrl;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <Button variant="ghost" className="mb-6 gap-2" asChild>
        <Link href="/browse">
          <ArrowLeft className="size-4" />
          Back to browse
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:items-start">
        <div className="relative aspect-2/3 w-full max-w-sm overflow-hidden rounded-xl border border-border/80 bg-muted md:mx-auto">
          {img ? (
            <Image
              src={img}
              alt={media.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No poster
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{media.mediaType}</Badge>
            <Badge variant="outline">{media.pricingType}</Badge>
            {media.editorsPick && (
              <Badge className="bg-primary text-primary-foreground">
                Editor&apos;s pick
              </Badge>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {media.title}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {media.releaseYear} · Directed by {media.director}
          </p>
          <p className="mt-2 text-sm">
            <span className="font-medium text-foreground">
              {media.averageRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground"> / 10 avg · </span>
            <span className="text-muted-foreground">
              {media.reviews.filter((r) => r?.isPublished).length} published
              reviews
            </span>
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {media.genres.map((g) => (
              <Badge key={g} variant="outline">
                {g}
              </Badge>
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-foreground/90">
            {media.synopsis}
          </p>

          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Cast
            </h2>
            <p className="mt-1 text-sm">{media.cast.join(', ')}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Platforms
            </h2>
            <p className="mt-1 text-sm">{media.platforms.join(', ')}</p>
          </div>

          {(media.purchasePrice != null || media.rentalPrice != null) && (
            <div className="mt-6 rounded-lg border border-border/80 bg-card/40 p-4 text-sm">
              <p className="font-medium">Buy or rent</p>
              <p className="mt-1 text-muted-foreground">
                {media.purchasePrice != null && (
                  <>Purchase: ${media.purchasePrice.toFixed(2)} · </>
                )}
                {media.rentalPrice != null && (
                  <>
                    Rent ({media.rentalDurationDays}d): $
                    {media.rentalPrice.toFixed(2)}
                  </>
                )}
              </p>
              <TitlePurchaseButtons media={media} />
              <p className="mt-2 text-xs text-muted-foreground">
                Checkout uses Stripe when you are logged in.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <MediaDetailClient media={media} />
      </div>
    </div>
  );
}
