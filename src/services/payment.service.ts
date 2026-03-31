import { clientFetchJson } from '@/lib/client-api';
import type { SubscriptionPlan } from '@/types/domain.types';

export async function createSubscriptionCheckout(plan: SubscriptionPlan) {
  return clientFetchJson<{ url: string; sessionId: string }>(
    '/api/payment/checkout',
    {
      method: 'POST',
      body: JSON.stringify({ plan }),
    },
  );
}

export async function getMySubscription() {
  return clientFetchJson<{
    id: string;
    plan: SubscriptionPlan;
    status: string;
    startDate: string | null;
    endDate: string | null;
  } | null>('/api/payment/my-subscription');
}

export async function getMyPayments() {
  return clientFetchJson<
    {
      id: string;
      amount: number;
      currency: string;
      status: string;
      plan: SubscriptionPlan;
      createdAt: string;
    }[]
  >('/api/payment/my-payments');
}

export async function fetchMyPayments() {
  return getMyPayments();
}

export async function fetchMyEntitlements() {
  return clientFetchJson<
    {
      id: string;
      mediaId: string;
      accessType: string;
      status: string;
      expiresAt: string | null;
      createdAt: string;
      media: {
        id: string;
        title: string;
        posterUrl: string | null;
      };
    }[]
  >('/api/payment/my-entitlements');
}

export async function createTitleCheckout(
  mediaId: string,
  accessType: 'PURCHASE' | 'RENTAL',
) {
  return clientFetchJson<{ url: string; sessionId: string }>(
    '/api/payment/title-checkout',
    {
      method: 'POST',
      body: JSON.stringify({ mediaId, accessType }),
    },
  );
}
