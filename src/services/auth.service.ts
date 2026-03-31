import { clientFetchJson } from '@/lib/client-api';
import type { SessionUser } from '@/types/user.types';

export async function fetchSessionUser() {
  return clientFetchJson<SessionUser | null>('/api/auth/me');
}

export async function registerUser(body: {
  name: string;
  email: string;
  password: string;
}) {
  return clientFetchJson<unknown>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function loginUser(body: { email: string; password: string }) {
  return clientFetchJson<unknown>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export async function requestPasswordReset(email: string) {
  return clientFetchJson<null>('/api/auth/forget-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(body: {
  token: string;
  newPassword: string;
}) {
  return clientFetchJson<null>('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
