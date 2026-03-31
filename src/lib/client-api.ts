const API_BASE = ''; // empty = same origin, rewrites handle the proxy

export async function clientFetchJson<T>(
  path: string,
  options: RequestInit = {},
): Promise<{ data: T }> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Origin:
        typeof window !== 'undefined'
          ? window.location.origin
          : 'http://localhost:3000',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}
