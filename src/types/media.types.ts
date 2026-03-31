import type { MediaType, PricingType } from "./domain.types";

export interface MediaListItem {
  id: string;
  title: string;
  mediaType: MediaType;
  synopsis: string;
  genres: string[];
  releaseYear: number;
  director: string;
  cast: string[];
  platforms: string[];
  pricingType: PricingType;
  editorsPick: boolean;
  purchasePrice: number | null;
  rentalPrice: number | null;
  rentalDurationDays: number;
  streamUrl: string | null;
  posterUrl: string | null;
  thumbnailUrl: string | null;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  _count?: { reviews: number; watchlisted: number };
}

export interface ReviewUser {
  id: string;
  name: string | null;
  email?: string | null;
}

export interface CommentItem {
  id: string;
  content: string;
  createdAt: string;
  user: ReviewUser;
  parentId?: string | null;
}

export interface ReviewOnMedia {
  id: string;
  rating: number;
  content: string;
  spoiler: boolean;
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  user: ReviewUser;
  likes: { userId: string }[];
  comments: CommentItem[];
}

export interface MediaDetail extends MediaListItem {
  reviews: ReviewOnMedia[];
}
