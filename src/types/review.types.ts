import type { MediaListItem } from "./media.types";
import type { ReviewUser } from "./media.types";

export interface ReviewFeedItem {
  id: string;
  rating: number;
  content: string;
  spoiler: boolean;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  user: ReviewUser & { email?: string | null };
  media: Pick<MediaListItem, "id" | "title">;
  _count: { comments: number; likes: number };
}
