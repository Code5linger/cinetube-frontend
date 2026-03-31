import { serverFetchJson } from "@/lib/server-api";
import type { MediaDetail, MediaListItem } from "@/types/media.types";
import type { MediaSort } from "@/types/domain.types";

const qs = (params: Record<string, string | number | undefined>) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    u.set(k, String(v));
  }
  const s = u.toString();
  return s ? `?${s}` : "";
};

export async function getMediaList(args: {
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
  return serverFetchJson<MediaListItem[]>(
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
      editorsPick: args.editorsPick ? "true" : undefined,
    })}`,
  );
}

export async function getMediaById(id: string) {
  return serverFetchJson<MediaDetail>(`/api/media/${id}`);
}
