'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  fetchMyEntitlements,
  fetchMyPayments,
} from '@/services/payment.service';
import { useSession } from '@/hooks/useSession';

export default function PurchasesPage() {
  const { data: user, isPending: sessionLoading } = useSession();

  const payments = useQuery({
    queryKey: ['payments', 'mine'],
    queryFn: async () => (await fetchMyPayments()).data,
    enabled: Boolean(user),
  });

  const entitlements = useQuery({
    queryKey: ['entitlements', 'mine'],
    queryFn: async () => (await fetchMyEntitlements()).data,
    enabled: Boolean(user),
  });

  if (sessionLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Purchases</h1>
        <p className="mt-2 text-muted-foreground">
          Log in to see payments and title access.
        </p>
        <Button className="mt-6" asChild>
          <Link href="/login?redirect=/purchases">Log in</Link>
        </Button>
      </div>
    );
  }

  const paymentRows = payments.data ?? [];
  const entitlementRows = entitlements.data ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Purchases &amp; access
      </h1>
      <p className="mt-2 text-muted-foreground">
        Stripe payment records and active title entitlements.
      </p>

      {/* Payments */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Payments</h2>
        {payments.isLoading ? (
          <Loader2 className="mt-4 size-6 animate-spin text-muted-foreground" />
        ) : paymentRows.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No payments yet.</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border/80">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Currency</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Gateway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {paymentRows.map((p: any) => (
                  <tr
                    key={p.id}
                    className="bg-background/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-medium">{p.plan ?? '—'}</td>
                    <td className="px-4 py-3">
                      {typeof p.amount === 'number' ? p.amount.toFixed(2) : '—'}
                    </td>
                    <td className="px-4 py-3 uppercase text-muted-foreground">
                      {p.currency}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          p.status === 'PAID'
                            ? 'bg-green-500/15 text-green-600'
                            : p.status === 'PENDING'
                              ? 'bg-yellow-500/15 text-yellow-600'
                              : 'bg-destructive/15 text-destructive'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {p.gateway}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Entitlements */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold">Title entitlements</h2>
        {entitlements.isLoading ? (
          <Loader2 className="mt-4 size-6 animate-spin text-muted-foreground" />
        ) : entitlementRows.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No title purchases or rentals yet.{' '}
            <Link
              href="/browse"
              className="text-primary underline underline-offset-4"
            >
              Browse titles
            </Link>
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border/80">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Access type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Expires</th>
                  <th className="px-4 py-3 font-medium">Purchased</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {entitlementRows.map((e: any) => (
                  <tr
                    key={e.id}
                    className="bg-background/50 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/media/${e.mediaId}`}
                        className="hover:text-primary hover:underline"
                      >
                        {e.media?.title ?? e.mediaId}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {e.accessType}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          e.status === 'PAID'
                            ? 'bg-green-500/15 text-green-600'
                            : 'bg-yellow-500/15 text-yellow-600'
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {e.expiresAt
                        ? new Date(e.expiresAt).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
