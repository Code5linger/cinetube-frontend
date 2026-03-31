'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { createMedia } from '@/services/media.service';
import { MediaForm } from '../../MediaForm';
// import { MediaForm } from '@/components/admin/MediaForm';

export default function NewMediaPage() {
  const router = useRouter();

  const mut = useMutation({
    mutationFn: (body: Record<string, unknown>) => createMedia(body),
    onSuccess: () => router.push('/admin/media'),
  });

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold tracking-tight">Add title</h1>
      <p className="mt-1 text-muted-foreground">Create a new media entry.</p>
      <div className="mt-8">
        <MediaForm
          isPending={mut.isPending}
          onSubmit={(values) => mut.mutate(values)}
        />
      </div>
    </div>
  );
}
