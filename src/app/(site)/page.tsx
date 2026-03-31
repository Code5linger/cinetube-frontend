import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MediaCard } from "@/components/media/MediaCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMediaList } from "@/services/media.server";
import { Badge } from "@/components/ui/badge";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const q = (await searchParams).q ?? "";

  const [topRated, newlyAdded, editorsPicks] = await Promise.all([
    getMediaList({ sort: "top", limit: 8 }),
    getMediaList({ sort: "latest", limit: 8 }),
    getMediaList({ editorsPick: true, limit: 8 }),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4 gap-1">
              <Sparkles className="size-3" />
              Rate · Review · Stream
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Your portal for movies &amp; series
            </h1>
            <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
              Search the library, read curated reviews, build your watchlist,
              and unlock premium streaming with a subscription.
            </p>
            <form
              action="/browse"
              className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
            >
              <Input
                name="search"
                placeholder="Search title, director, cast…"
                defaultValue={q}
                className="h-11 flex-1 bg-background/80"
              />
              <Button type="submit" size="lg" className="sm:w-auto">
                Search
                <ArrowRight className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Top rated
            </h2>
            <p className="text-sm text-muted-foreground">
              Highest average scores in the catalog
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/browse?sort=top">View all</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {topRated.data.slice(0, 8).map((m) => (
            <MediaCard key={m.id} media={m} />
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Newly added
              </h2>
              <p className="text-sm text-muted-foreground">
                Recently added titles
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/browse?sort=latest">View all</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {newlyAdded.data.slice(0, 8).map((m) => (
              <MediaCard key={m.id} media={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Editor&apos;s picks
            </h2>
            <p className="text-sm text-muted-foreground">
              Hand-picked highlights from the team
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/browse?editorsPick=1">View all</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {editorsPicks.data.length === 0 && (
            <p className="col-span-full text-sm text-muted-foreground">
              No editor picks yet — admins can flag titles in the media library.
            </p>
          )}
          {editorsPicks.data.map((m) => (
            <MediaCard key={m.id} media={m} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/80 bg-card/40 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            Subscription plans
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            Premium unlocks streaming for catalog titles that require a
            subscription. Title purchase and rental are available per movie where
            priced.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Free",
                price: "$0",
                desc: "Browse, review, and use the community features.",
                cta: "Get started",
                href: "/register",
              },
              {
                name: "Monthly",
                price: "Stripe",
                desc: "Premium access billed monthly via checkout.",
                cta: "Choose monthly",
                href: "/subscription?plan=MONTHLY",
              },
              {
                name: "Yearly",
                price: "Save 20%",
                desc: "Best value for long-term viewers.",
                cta: "Choose yearly",
                href: "/subscription?plan=YEARLY",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="flex flex-col rounded-xl border border-border/80 bg-background/80 p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-2 text-3xl font-bold tabular-nums">
                  {plan.price}
                </p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {plan.desc}
                </p>
                <Button className="mt-6" asChild variant="secondary">
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
