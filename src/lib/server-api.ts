import { cookies } from "next/headers";

const appOrigin = () =>
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export async function serverFetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<ApiEnvelope<T>> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(`${appOrigin()}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...init?.headers,
    },
  });

  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (!res.ok) {
    const msg =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof (body as { message: unknown }).message === "string"
        ? (body as { message: string }).message
        : text || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return body as ApiEnvelope<T>;
}
