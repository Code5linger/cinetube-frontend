'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createTitleCheckout } from '@/services/payment.service';
import type { TitleAccessType } from '@/types/domain.types';
import type { MediaListItem } from '@/types/media.types';
import { useSession } from '@/hooks/useSession';

export function TitlePurchaseButtons({ media }: { media: MediaListItem }) {
  const { data: user } = useSession();
  const [loading, setLoading] = useState<TitleAccessType | null>(null);

  if (media.pricingType !== 'PREMIUM') return null;
  if (!media.purchasePrice && !media.rentalPrice) return null;

  async function go(accessType: TitleAccessType) {
    if (!user) {
      toast.error('Log in to purchase or rent');
      return;
    }
    setLoading(accessType);
    try {
      const res = await createTitleCheckout(media.id, accessType);
      const url = res.data.url;
      if (url) window.location.href = url;
      else toast.error('No checkout URL returned');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Checkout failed');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {media.purchasePrice != null && media.purchasePrice > 0 && (
        <Button
          type="button"
          variant="secondary"
          disabled={loading !== null}
          onClick={() => go('PURCHASE')}
        >
          {loading === 'PURCHASE' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : null}
          Buy ${media.purchasePrice.toFixed(2)}
        </Button>
      )}
      {media.rentalPrice != null && media.rentalPrice > 0 && (
        <Button
          type="button"
          variant="outline"
          disabled={loading !== null}
          onClick={() => go('RENTAL')}
        >
          {loading === 'RENTAL' ? (
            <Loader2 className="size-4 animate-spin" />
          ) : null}
          Rent {media.rentalDurationDays}d · ${media.rentalPrice.toFixed(2)}
        </Button>
      )}
    </div>
  );
}
