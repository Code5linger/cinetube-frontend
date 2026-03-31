import { clientFetchJson } from "@/lib/client-api";
import type { MediaListItem } from "@/types/media.types";

export async function fetchWatchlist() {
  return clientFetchJson<
    { id: string; media: MediaListItem; createdAt: string }[]
  >("/api/watchlist");
}

export async function addToWatchlist(mediaId: string) {
  return clientFetchJson<unknown>(`/api/watchlist/${mediaId}`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export async function removeFromWatchlist(mediaId: string) {
  return clientFetchJson<null>(`/api/watchlist/${mediaId}`, {
    method: "DELETE",
  });
}
