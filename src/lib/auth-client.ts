function appOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') ??
    'http://localhost:3000'
  );
}

async function authFetch(path: string, body: object) {
  const res = await fetch(`${appOrigin()}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Origin: appOrigin(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(t || 'Auth request failed');
  }

  return res.json();
}

export async function signInEmail(email: string, password: string) {
  return authFetch('/api/better-auth/sign-in/email', {
    email,
    password,
    callbackURL: '/',
  });
}

export async function signUpEmail(
  name: string,
  email: string,
  password: string,
) {
  return authFetch('/api/better-auth/sign-up/email', {
    name,
    email,
    password,
    callbackURL: '/',
  });
}

export async function signOut() {
  return authFetch('/api/better-auth/sign-out', {});
}

export function getGoogleSignInUrl(callbackURL = '/') {
  const params = new URLSearchParams({ callbackURL });
  return `${appOrigin()}/api/better-auth/sign-in/social?provider=google&${params.toString()}`;
}
