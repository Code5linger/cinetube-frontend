// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Clapperboard, Menu, User } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
// import { cn } from '@/lib/utils';
// import { signOut as signOutRequest } from '@/lib/auth-client';
// import { useSession } from '@/hooks/useSession';
// import { useState } from 'react';

// const nav = [
//   { href: '/browse', label: 'Browse' },
//   { href: '/reviews', label: 'Reviews' },
//   { href: '/subscription', label: 'Plans' },
//   { href: '/about', label: 'About' },
// ];

// export function SiteHeader() {
//   const pathname = usePathname();
//   const { data: user, isPending } = useSession();
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
//         <div className="flex items-center gap-6">
//           <Link
//             href="/"
//             className="flex items-center gap-2 font-semibold tracking-tight"
//           >
//             <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
//               <Clapperboard className="size-5" />
//             </span>
//             <span className="hidden sm:inline">CineTube</span>
//           </Link>
//           <nav className="hidden items-center gap-1 md:flex">
//             {nav.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
//                   pathname === item.href && 'bg-muted text-foreground',
//                 )}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>
//         </div>

//         <div className="flex items-center gap-2">
//           {!isPending && user && (
//             <Button
//               variant="outline"
//               size="sm"
//               className="hidden sm:inline-flex"
//               asChild
//             >
//               <Link href="/watchlist">Watchlist</Link>
//             </Button>
//           )}
//           {!isPending && user?.role === 'ADMIN' && (
//             <Button
//               variant="secondary"
//               size="sm"
//               className="hidden sm:inline-flex"
//               asChild
//             >
//               <Link href="/admin">Admin</Link>
//             </Button>
//           )}

//           <Sheet open={open} onOpenChange={setOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="md:hidden">
//                 <Menu className="size-5" />
//                 <span className="sr-only">Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[280px]">
//               <div className="mt-8 flex flex-col gap-2">
//                 {nav.map((item) => (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     onClick={() => setOpen(false)}
//                     className={cn(
//                       'rounded-md px-3 py-2 text-sm font-medium',
//                       pathname === item.href
//                         ? 'bg-muted text-foreground'
//                         : 'text-muted-foreground',
//                     )}
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//                 {user && (
//                   <>
//                     <Link
//                       href="/watchlist"
//                       onClick={() => setOpen(false)}
//                       className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
//                     >
//                       Watchlist
//                     </Link>
//                     {user.role === 'ADMIN' && (
//                       <Link
//                         href="/admin"
//                         onClick={() => setOpen(false)}
//                         className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
//                       >
//                         Admin
//                       </Link>
//                     )}
//                   </>
//                 )}
//               </div>
//             </SheetContent>
//           </Sheet>

//           {!isPending && !user && (
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" size="sm" asChild>
//                 <Link href="/login">Log in</Link>
//               </Button>
//               <Button size="sm" asChild>
//                 <Link href="/register">Sign up</Link>
//               </Button>
//             </div>
//           )}

//           {!isPending && user && (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" size="icon" className="rounded-full">
//                   <User className="size-4" />
//                   <span className="sr-only">Account</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-48">
//                 <div className="px-2 py-1.5 text-sm">
//                   <p className="font-medium">{user.name ?? 'Member'}</p>
//                   <p className="truncate text-xs text-muted-foreground">
//                     {user.email}
//                   </p>
//                 </div>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/profile">Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/watchlist">Watchlist</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/purchases">Purchases</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem
//                   onClick={async () => {
//                     await signOutRequest();
//                     window.location.href = '/';
//                   }}
//                 >
//                   Sign out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Clapperboard, Menu, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { signOut as signOutRequest } from '@/lib/auth-client';
import { useSession } from '@/hooks/useSession';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/browse', label: 'Browse' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/subscription', label: 'Plans' },
  { href: '/about', label: 'About' },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { data: user, isPending } = useSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOutRequest();
      window.location.href = '/';
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* ── Left: Logo + Desktop Nav ── */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Clapperboard className="size-5" />
            </span>
            <span className="hidden sm:inline">CineTube</span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  pathname === item.href && 'bg-muted text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Right: Actions ── */}
        <div className="flex items-center gap-2">
          {/* Loading skeleton */}
          {isPending && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
              <div className="size-9 animate-pulse rounded-full bg-muted" />
            </div>
          )}

          {/* Authenticated */}
          {!isPending && user && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link href="/watchlist">Watchlist</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link href="/profile">Profile</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
                asChild
              >
                <Link href="/purchases">Dashboard</Link>
              </Button>

              {user.role === 'ADMIN' && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="hidden sm:inline-flex"
                  asChild
                >
                  <Link href="/admin">Admin</Link>
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    aria-label="Account menu"
                  >
                    <User className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium leading-none">
                      {user.name ?? 'Member'}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/watchlist">Watchlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/purchases">Purchases</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled={signingOut}
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive"
                  >
                    {signingOut ? (
                      <>
                        <Loader2 className="mr-2 size-3.5 animate-spin" />
                        Signing out…
                      </>
                    ) : (
                      'Sign out'
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          {/* Guest */}
          {!isPending && !user && (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
          <ThemeToggle />
          {/* ── Mobile drawer ── */}
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 px-4 pt-10">
              <nav
                className="flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      pathname === item.href
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Link>
                ))}

                {user && (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <Link
                      href="/watchlist"
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Watchlist
                    </Link>
                    <Link
                      href="/purchases"
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Purchases
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setDrawerOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Admin
                      </Link>
                    )}
                    <div className="my-2 h-px bg-border" />
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        handleSignOut();
                      }}
                      disabled={signingOut}
                      className="rounded-md px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
                    >
                      {signingOut ? 'Signing out…' : 'Sign out'}
                    </button>
                  </>
                )}

                {!user && !isPending && (
                  <>
                    <div className="my-2 h-px bg-border" />
                    <Link
                      href="/login"
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setDrawerOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-primary"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
