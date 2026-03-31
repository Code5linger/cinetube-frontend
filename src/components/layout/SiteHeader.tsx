"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clapperboard, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { signOut as signOutRequest } from "@/lib/auth-client";
import { useSession } from "@/hooks/useSession";
import { useState } from "react";

const nav = [
  { href: "/browse", label: "Browse" },
  { href: "/reviews", label: "Reviews" },
  { href: "/subscription", label: "Plans" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: user, isPending } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Clapperboard className="size-5" />
            </span>
            <span className="hidden sm:inline">CineTube</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === item.href && "bg-muted text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {!isPending && user && (
            <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/watchlist">Watchlist</Link>
            </Button>
          )}
          {!isPending && user?.role === "ADMIN" && (
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="mt-8 flex flex-col gap-2">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <>
                    <Link
                      href="/watchlist"
                      onClick={() => setOpen(false)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
                    >
                      Watchlist
                    </Link>
                    {user.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground"
                      >
                        Admin
                      </Link>
                    )}
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {!isPending && !user && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}

          {!isPending && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="size-4" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{user.name ?? "Member"}</p>
                  <p className="truncate text-xs text-muted-foreground">
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
                  onClick={async () => {
                    await signOutRequest();
                    window.location.href = "/";
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
