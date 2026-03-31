'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import {
  fetchAllPayments,
  fetchAllTitleEntitlements,
} from '@/services/admin.service';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PaymentRow {
  id: string;
  amount: number;
  currency: string;
  gateway: string;
  status: string;
  plan: string;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
}

interface EntitlementRow {
  id: string;
  accessType: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  user: { id: string; name: string | null; email: string };
  media: { id: string; title: string };
}

function statusVariant(s: string) {
  if (s === 'PAID') return 'default' as const;
  if (s === 'PENDING') return 'secondary' as const;
  if (s === 'FAILED' || s === 'REFUNDED') return 'destructive' as const;
  return 'outline' as const;
}

export default function AdminPaymentsPage() {
  const paymentsQ = useQuery({
    queryKey: ['admin', 'payments', 'all'],
    queryFn: async () => (await fetchAllPayments()).data as PaymentRow[],
  });

  const entitlementsQ = useQuery({
    queryKey: ['admin', 'entitlements', 'all'],
    queryFn: async () =>
      (await fetchAllTitleEntitlements()).data as EntitlementRow[],
  });

  const payments = paymentsQ.data ?? [];
  const entitlements = entitlementsQ.data ?? [];

  const totalPaid = payments
    .filter((p) => p.status === 'PAID')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
      <p className="mt-2 text-muted-foreground">
        Subscription transactions and per-title entitlements.
      </p>

      {/* ── Stats ── */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          ['Total transactions', payments.length],
          ['Paid', payments.filter((p) => p.status === 'PAID').length],
          ['Revenue', `$${totalPaid.toFixed(2)}`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-border/80 bg-card/40 p-4"
          >
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Subscription payments ── */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold">Subscription payments</h2>
        {paymentsQ.isLoading ? (
          <Loader2 className="mt-4 size-6 animate-spin text-muted-foreground" />
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border/80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Gateway</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No payments yet.
                    </TableCell>
                  </TableRow>
                )}
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <p className="font-medium">{p.user.name ?? '—'}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.user.email}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{p.plan}</Badge>
                    </TableCell>
                    <TableCell>
                      {p.amount.toFixed(2)}{' '}
                      <span className="text-xs uppercase text-muted-foreground">
                        {p.currency}
                      </span>
                    </TableCell>
                    <TableCell className="capitalize">{p.gateway}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(p.status)}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      {/* ── Title entitlements ── */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Title entitlements</h2>
        {entitlementsQ.isLoading ? (
          <Loader2 className="mt-4 size-6 animate-spin text-muted-foreground" />
        ) : (
          <div className="mt-4 overflow-x-auto rounded-xl border border-border/80">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entitlements.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No entitlements yet.
                    </TableCell>
                  </TableRow>
                )}
                {entitlements.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>
                      <p className="font-medium">{e.user.name ?? '—'}</p>
                      <p className="text-xs text-muted-foreground">
                        {e.user.email}
                      </p>
                    </TableCell>
                    <TableCell className="font-medium">
                      {e.media.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{e.accessType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(e.status)}>
                        {e.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {e.expiresAt
                        ? new Date(e.expiresAt).toLocaleDateString()
                        : '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
