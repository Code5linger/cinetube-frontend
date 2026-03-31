'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { fetchMediaList, deleteMedia } from '@/services/media.service';
import { Button } from '@/components/ui/button';
import type { MediaListItem } from '@/types/media.types';

export default function AdminMediaPage() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);

  const q = useQuery({
    queryKey: ['admin', 'media', page],
    queryFn: () => fetchMediaList({ page, limit: 20 }),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteMedia(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'media'] }),
  });

  if (q.isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (q.isError || !q.data) {
    return <p className="text-destructive">Failed to load media.</p>;
  }

  const items: MediaListItem[] = q.data.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media</h1>
          <p className="mt-1 text-muted-foreground">Manage all titles.</p>
        </div>
        <Button asChild>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Link href={'/admin/media/new' as any}>
            <Plus className="mr-2 size-4" /> Add title
          </Link>
        </Button>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border/80">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Year</th>
              <th className="px-4 py-3 font-medium">Genre</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {items.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-muted-foreground"
                >
                  No media found.
                </td>
              </tr>
            )}
            {items.map((m: MediaListItem) => (
              <tr
                key={m.id}
                className="bg-background/50 hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{m.title}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {m.releaseYear ?? '—'}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {m.genres.length > 0 ? m.genres.join(', ') : '—'}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {m.averageRating ?? '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <Link href={`/admin/media/${m.id}/edit` as any}>
                        <Pencil className="size-3.5" />
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      disabled={del.isPending}
                      onClick={() => {
                        if (confirm(`Delete "${m.title}"?`)) del.mutate(m.id);
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page {page}</span>
        <Button
          variant="outline"
          size="sm"
          disabled={items.length < 20}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
