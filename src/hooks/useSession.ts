'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchSessionUser } from '@/services/auth.service';
import type { SessionUser } from '@/types/user.types';

export function useSession() {
  return useQuery({
    queryKey: ['session', 'me'],
    queryFn: async (): Promise<SessionUser | null> => {
      try {
        const res = await fetchSessionUser();
        return res.data;
      } catch {
        return null;
      }
    },
    retry: false,
  });
}
