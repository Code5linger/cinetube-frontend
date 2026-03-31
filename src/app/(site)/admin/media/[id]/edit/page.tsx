'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { fetchMediaById, updateMedia } from '@/services/media.service';
import { MediaForm } from '../../../MediaForm';
// import { MediaForm } from '@/components/admin/MediaForm';

export default function EditMediaPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const q = useQuery({
    queryKey: ['media', id],
    queryFn: () => fetchMediaById(id),
  });

  const mut = useMutation({
    mutationFn: (body: Record<string, unknown>) => updateMedia(id, body),
    onSuccess: () => router.push('/admin/media'),
  });

  if (q.isLoading) {
    return (
      <div className="flex min-h-[30vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (q.isError || !q.data?.data) {
    return <p className="text-destructive">Failed to load media.</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Edit title</h1>
      <p className="mt-1 text-muted-foreground">{q.data.data.title}</p>
      <div className="mt-8">
        <MediaForm
          defaultValues={q.data.data}
          isPending={mut.isPending}
          onSubmit={(values) => mut.mutate(values)}
        />
      </div>
    </div>
  );
}
