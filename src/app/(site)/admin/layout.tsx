'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useSession } from '@/hooks/useSession';
import { cn } from '@/lib/utils';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/moderation', label: 'Moderation' },
  { href: '/admin/payments', label: 'Payments' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isPending } = useSession();
  const pathname = usePathname();

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Admin access</h1>
        <p className="mt-2 text-muted-foreground">
          You need an administrator account to view this area.
        </p>
        <Link href="/" className="mt-6 inline-block text-primary underline">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 lg:flex-row lg:px-6">
      <aside className="lg:w-56 lg:shrink-0">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Admin
        </h2>
        <nav className="flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium',
                pathname === l.href
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
