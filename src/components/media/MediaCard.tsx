import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import type { MediaListItem } from '@/types/media.types';
import { cn } from '@/lib/utils';

export function MediaCard({
  media,
  className,
}: {
  media: MediaListItem;
  className?: string;
}) {
  const img = media.posterUrl ?? media.thumbnailUrl;
  return (
    <Link href={`/media/${media.id}`} className={cn('group block', className)}>
      <Card className="overflow-hidden border-border/80 transition-shadow hover:shadow-lg">
        <div className="relative aspect-2/3 bg-muted">
          {img ? (
            <Image
              src={img}
              alt={media.title}
              fill
              unoptimized
              className="object-cover transition-transform group-hover:scale-[1.02]"
              sizes="(max-width:768px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No poster
            </div>
          )}
          {media.editorsPick && (
            <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
              Editor&apos;s pick
            </Badge>
          )}
        </div>
        <CardContent className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold leading-snug">
              {media.title}
            </h3>
            <span className="flex shrink-0 items-center gap-0.5 text-xs text-amber-400">
              <Star className="size-3.5 fill-amber-400" />
              {media.averageRating.toFixed(1)}
            </span>
          </div>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {media.releaseYear} · {media.mediaType}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
