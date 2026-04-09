'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GENRES = [
  'All',
  'Action',
  'Drama',
  'Comedy',
  'Sci-fi',
  'Horror',
  'Documentary',
  'Animation',
  'Thriller',
];

interface Props {
  initialQ: string;
  initialGenre: string;
}

export function HeroSearch({ initialQ, initialGenre }: Props) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ);
  const [genre, setGenre] = useState(initialGenre || 'All');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (genre !== 'All') params.set('genre', genre);
    router.push(`/browse?${params.toString()}`);
  }

  return (
    <div className="mt-7 w-full max-w-xl animate-fade-in">
      {/* Genre chips */}
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        {GENRES.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              genre === g
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border text-muted-foreground hover:border-border/80 hover:text-foreground',
            )}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, director, cast…"
          className="h-11 flex-1 bg-background/80"
          aria-label="Search query"
        />
        <Button type="submit" size="lg" className="shrink-0">
          Search
          <ArrowRight className="size-4" />
        </Button>
      </form>
    </div>
  );
}
