import { clientFetchJson } from "@/lib/client-api";
import type { SessionUser } from "@/types/user.types";
import type { AccountStatus, Role } from "@/types/domain.types";
import type { ReviewFeedItem } from "@/types/review.types";

export async function fetchAdminDashboard() {
  return clientFetchJson<{
    stats: {
      totalUsers: number;
      totalMedia: number;
      totalReviews: number;
      publishedReviews: number;
      pendingReviewsCount: number;
      totalPayments: number;
    };
    pendingReviews: ReviewFeedItem[];
  }>("/api/admin/dashboard");
}

export async function fetchAdminUsers() {
  return clientFetchJson<SessionUser[]>("/api/admin/users");
}

export async function fetchMediaAnalytics() {
  return clientFetchJson<unknown>("/api/admin/analytics/media");
}

export async function approveReview(id: string) {
  return clientFetchJson<unknown>(`/api/admin/reviews/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}

export async function unpublishReview(id: string) {
  return clientFetchJson<unknown>(`/api/admin/reviews/${id}/unpublish`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}

export async function deleteReviewAdmin(id: string) {
  return clientFetchJson<null>(`/api/admin/reviews/${id}`, {
    method: "DELETE",
  });
}

export async function fetchPendingComments() {
  return clientFetchJson<unknown[]>("/api/admin/comments/pending");
}

export async function approveComment(id: string) {
  return clientFetchJson<unknown>(`/api/admin/comments/${id}/approve`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}

export async function unpublishComment(id: string) {
  return clientFetchJson<unknown>(`/api/admin/comments/${id}/unpublish`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}

export async function deleteCommentAdmin(id: string) {
  return clientFetchJson<null>(`/api/admin/comments/${id}`, {
    method: "DELETE",
  });
}

export async function changeUserStatus(userId: string, status: AccountStatus) {
  return clientFetchJson<unknown>("/api/admin/users/change-status", {
    method: "PATCH",
    body: JSON.stringify({ userId, status }),
  });
}

export async function changeUserRole(userId: string, role: Role) {
  return clientFetchJson<unknown>("/api/admin/users/change-role", {
    method: "PATCH",
    body: JSON.stringify({ userId, role }),
  });
}

export async function deleteUser(userId: string) {
  return clientFetchJson<null>(`/api/admin/users/${userId}`, {
    method: "DELETE",
  });
}

export async function fetchAllPayments() {
  return clientFetchJson<unknown[]>("/api/payment/all");
}

export async function fetchAllTitleEntitlements() {
  return clientFetchJson<unknown[]>("/api/payment/title-entitlements/all");
}
