import { clientFetchJson } from '@/lib/client-api';
import type { MediaDetail, MediaListItem } from '@/types/media.types';
import type { MediaSort } from '@/types/domain.types';

const qs = (params: Record<string, string | number | undefined>) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === '') continue;
    u.set(k, String(v));
  }
  const s = u.toString();
  return s ? `?${s}` : '';
};

export async function fetchMediaList(args: {
  search?: string;
  genre?: string;
  platform?: string;
  year?: string;
  sort?: MediaSort;
  page?: number;
  limit?: number;
  minRating?: string;
  maxRating?: string;
  editorsPick?: boolean;
}) {
  return clientFetchJson<MediaListItem[]>(
    `/api/media${qs({
      search: args.search,
      genre: args.genre,
      platform: args.platform,
      year: args.year,
      sort: args.sort,
      page: args.page,
      limit: args.limit,
      minRating: args.minRating,
      maxRating: args.maxRating,
      editorsPick: args.editorsPick ? 'true' : undefined,
    })}`,
  );
}

export async function fetchMediaById(id: string) {
  return clientFetchJson<MediaDetail>(`/api/media/${id}`);
}

export async function createMedia(body: Record<string, unknown>) {
  return clientFetchJson<MediaDetail>('/api/media', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function updateMedia(id: string, body: Record<string, unknown>) {
  return clientFetchJson<MediaDetail>(`/api/media/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}

export async function deleteMedia(id: string) {
  return clientFetchJson<null>(`/api/media/${id}`, {
    method: 'DELETE',
  });
}
