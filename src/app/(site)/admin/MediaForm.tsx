'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { MediaListItem } from '@/types/media.types';

interface Props {
  defaultValues?: Partial<MediaListItem>;
  isPending: boolean;
  onSubmit: (values: Record<string, unknown>) => void;
}

export function MediaForm({ defaultValues, isPending, onSubmit }: Props) {
  const [values, setValues] = useState({
    title: defaultValues?.title ?? '',
    synopsis: defaultValues?.synopsis ?? '',
    releaseYear: defaultValues?.releaseYear ?? new Date().getFullYear(),
    director: defaultValues?.director ?? '',
    genres: defaultValues?.genres?.join(', ') ?? '',
    platforms: defaultValues?.platforms?.join(', ') ?? '',
    mediaType: defaultValues?.mediaType ?? 'MOVIE',
    pricingType: defaultValues?.pricingType ?? 'FREE',
    posterUrl: defaultValues?.posterUrl ?? '',
    streamUrl: defaultValues?.streamUrl ?? '',
    purchasePrice: defaultValues?.purchasePrice ?? '',
    rentalPrice: defaultValues?.rentalPrice ?? '',
    rentalDurationDays: defaultValues?.rentalDurationDays ?? 7,
  });

  const field = (key: keyof typeof values) => ({
    value: String(values[key]),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [key]: e.target.value })),
  });

  const handleSubmit = () => {
    onSubmit({
      ...values,
      releaseYear: Number(values.releaseYear),
      genres: String(values.genres)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      platforms: String(values.platforms)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      purchasePrice:
        values.purchasePrice === '' ? null : Number(values.purchasePrice),
      rentalPrice:
        values.rentalPrice === '' ? null : Number(values.rentalPrice),
      rentalDurationDays: Number(values.rentalDurationDays),
    });
  };

  return (
    <div className="space-y-5">
      {(
        [
          ['title', 'Title', 'text'],
          ['synopsis', 'Synopsis', 'text'],
          ['releaseYear', 'Release year', 'number'],
          ['director', 'Director', 'text'],
          ['genres', 'Genres (comma-separated)', 'text'],
          ['platforms', 'Platforms (comma-separated)', 'text'],
          ['posterUrl', 'Poster URL', 'url'],
          ['streamUrl', 'Stream URL', 'url'],
          ['purchasePrice', 'Purchase price', 'number'],
          ['rentalPrice', 'Rental price', 'number'],
          ['rentalDurationDays', 'Rental duration (days)', 'number'],
        ] as const
      ).map(([key, label, type]) => (
        <div key={key} className="space-y-1.5">
          <Label htmlFor={key}>{label}</Label>
          <Input id={key} type={type} {...field(key)} />
        </div>
      ))}

      <div className="space-y-1.5">
        <Label htmlFor="mediaType">Media type</Label>
        <select
          id="mediaType"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...field('mediaType')}
        >
          <option value="MOVIE">Movie</option>
          <option value="SERIES">Series</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pricingType">Pricing type</Label>
        <select
          id="pricingType"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          {...field('pricingType')}
        >
          <option value="FREE">Free</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>

      <Button onClick={handleSubmit} disabled={isPending} className="w-full">
        {isPending ? 'Saving…' : 'Save'}
      </Button>
    </div>
  );
}
