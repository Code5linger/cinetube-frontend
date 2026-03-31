'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSession } from '@/hooks/useSession';
import { createSubscriptionCheckout } from '@/services/payment.service';
import type { SubscriptionPlan } from '@/types/domain.types';

export default function SubscriptionPage() {
  const { data: user, isPending } = useSession();
  const searchParams = useSearchParams();
  const defaultPlan =
    (searchParams.get('plan') as SubscriptionPlan | null) ?? 'MONTHLY';
  const [plan, setPlan] = useState<SubscriptionPlan>(
    defaultPlan === 'YEARLY' ? 'YEARLY' : 'MONTHLY',
  );
  const [loading, setLoading] = useState(false);

  async function checkout() {
    if (!user) {
      toast.error('Log in to subscribe');
      return;
    }
    setLoading(true);
    try {
      const res = await createSubscriptionCheckout(plan);
      const url = res.data.url;
      if (url) window.location.href = url;
      else toast.error('No checkout URL returned');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Checkout failed');
    } finally {
      setLoading(false);
    }
  }

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Subscription</h1>
        <p className="mt-2 text-muted-foreground">
          Log in to start Stripe checkout for premium access.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/login?redirect=/subscription">Log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Premium subscription
      </h1>
      <p className="mt-2 text-muted-foreground">
        Unlock premium catalog streaming where titles require a subscription.
        Billing is handled by Stripe (see backend env for price).
      </p>

      <div className="mt-8 flex gap-3">
        <Button
          type="button"
          variant={plan === 'MONTHLY' ? 'default' : 'outline'}
          onClick={() => setPlan('MONTHLY')}
        >
          Monthly
        </Button>
        <Button
          type="button"
          variant={plan === 'YEARLY' ? 'default' : 'outline'}
          onClick={() => setPlan('YEARLY')}
        >
          Yearly (20% off)
        </Button>
      </div>

      <Button
        className="mt-8"
        size="lg"
        disabled={loading}
        onClick={() => checkout()}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Continue to Stripe checkout'
        )}
      </Button>
    </div>
  );
}
