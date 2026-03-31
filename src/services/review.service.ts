import { clientFetchJson } from "@/lib/client-api";
import type { ReviewFeedItem } from "@/types/review.types";
import type { ReviewSort } from "@/types/domain.types";

const qs = (params: Record<string, string | number | undefined>) => {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === "") continue;
    u.set(k, String(v));
  }
  const s = u.toString();
  return s ? `?${s}` : "";
};

export async function fetchReviews(args: {
  page?: number;
  limit?: number;
  sort?: ReviewSort;
  genre?: string;
  platform?: string;
  minRating?: string;
  maxRating?: string;
  mediaId?: string;
}) {
  return clientFetchJson<ReviewFeedItem[]>(
    `/api/reviews${qs({
      page: args.page,
      limit: args.limit,
      sort: args.sort,
      genre: args.genre,
      platform: args.platform,
      minRating: args.minRating,
      maxRating: args.maxRating,
      mediaId: args.mediaId,
    })}`,
  );
}

export async function createReview(body: {
  mediaId: string;
  rating: number;
  content: string;
  spoiler?: boolean;
  tags?: string[];
}) {
  return clientFetchJson<unknown>("/api/reviews", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function toggleLikeReview(reviewId: string) {
  return clientFetchJson<{ liked: boolean }>(`/api/reviews/${reviewId}/like`, {
    method: "POST",
    body: JSON.stringify({}),
  });
}

export async function postComment(reviewId: string, body: { content: string; parentId?: string }) {
  return clientFetchJson<unknown>(`/api/reviews/${reviewId}/comments`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateReview(
  reviewId: string,
  body: Partial<{
    rating: number;
    content: string;
    spoiler: boolean;
    tags: string[];
  }>,
) {
  return clientFetchJson<unknown>(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteReview(reviewId: string) {
  return clientFetchJson<null>(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
}
