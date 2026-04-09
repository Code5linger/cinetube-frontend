// src/components/media/MediaCardSkeletonGrid.tsx
import { MediaCardSkeleton } from './MediaCardSkeleton';

export function MediaCardSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <MediaCardSkeleton key={i} />
      ))}
    </div>
  );
}
