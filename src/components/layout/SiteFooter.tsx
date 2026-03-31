import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/80 bg-card/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-semibold">CineTube</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Discover, rate, and stream movies and series. Built for learners and
            portfolio demos — connect your own API and Stripe keys.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Explore</span>
            <Link
              href="/browse"
              className="text-muted-foreground hover:text-foreground"
            >
              Browse
            </Link>
            <Link
              href="/reviews"
              className="text-muted-foreground hover:text-foreground"
            >
              Reviews
            </Link>
            <Link
              href="/subscription"
              className="text-muted-foreground hover:text-foreground"
            >
              Subscription
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Company</span>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CineTube. All rights reserved.
      </div>
    </footer>
  );
}
