/* eslint-disable @typescript-eslint/no-explicit-any */
// import Link from 'next/link';
// import { ArrowRight, Sparkles } from 'lucide-react';
// import { MediaCard } from '@/components/media/MediaCard';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { getMediaList } from '@/services/media.server';
// import { Badge } from '@/components/ui/badge';

// export default async function HomePage({
//   searchParams,
// }: {
//   searchParams: Promise<{ q?: string }>;
// }) {
//   const q = (await searchParams).q ?? '';

//   const [topRated, newlyAdded, editorsPicks] = await Promise.all([
//     getMediaList({ sort: 'top', limit: 8 }),
//     getMediaList({ sort: 'latest', limit: 8 }),
//     getMediaList({ editorsPick: true, limit: 8 }),
//   ]);

//   return (
//     <div>
//       <section className="relative overflow-hidden border-b border-border/80 bg-linear-to-b from-primary/10 via-background to-background">
//         <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
//           <div className="mx-auto max-w-3xl text-center">
//             <Badge variant="secondary" className="mb-4 gap-1">
//               <Sparkles className="size-3" />
//               Rate · Review · Stream
//             </Badge>
//             <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
//               Your portal for movies &amp; series
//             </h1>
//             <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
//               Search the library, read curated reviews, build your watchlist,
//               and unlock premium streaming with a subscription.
//             </p>
//             <form
//               action="/browse"
//               className="mx-auto mt-8 flex max-w-xl flex-col gap-2 sm:flex-row"
//             >
//               <Input
//                 name="search"
//                 placeholder="Search title, director, cast…"
//                 defaultValue={q}
//                 className="h-11 flex-1 bg-background/80"
//               />
//               <Button type="submit" size="lg" className="sm:w-auto">
//                 Search
//                 <ArrowRight className="size-4" />
//               </Button>
//             </form>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight">Top rated</h2>
//             <p className="text-sm text-muted-foreground">
//               Highest average scores in the catalog
//             </p>
//           </div>
//           <Button variant="ghost" asChild>
//             <Link href="/browse?sort=top">View all</Link>
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
//           {topRated.data.slice(0, 8).map((m) => (
//             <MediaCard key={m.id} media={m} />
//           ))}
//         </div>
//       </section>

//       <section className="border-y border-border/60 bg-muted/20 py-12">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6">
//           <div className="mb-6 flex items-end justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-semibold tracking-tight">
//                 Newly added
//               </h2>
//               <p className="text-sm text-muted-foreground">
//                 Recently added titles
//               </p>
//             </div>
//             <Button variant="ghost" asChild>
//               <Link href="/browse?sort=latest">View all</Link>
//             </Button>
//           </div>
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//             {newlyAdded.data.slice(0, 8).map((m) => (
//               <MediaCard key={m.id} media={m} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight">
//               Editor&apos;s picks
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Hand-picked highlights from the team
//             </p>
//           </div>
//           <Button variant="ghost" asChild>
//             <Link href="/browse?editorsPick=1">View all</Link>
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//           {editorsPicks.data.length === 0 && (
//             <p className="col-span-full text-sm text-muted-foreground">
//               No editor picks yet — admins can flag titles in the media library.
//             </p>
//           )}
//           {editorsPicks.data.map((m) => (
//             <MediaCard key={m.id} media={m} />
//           ))}
//         </div>
//       </section>

//       <section className="border-t border-border/80 bg-card/40 py-14">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6">
//           <h2 className="text-center text-2xl font-semibold tracking-tight">
//             Subscription plans
//           </h2>
//           <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
//             Premium unlocks streaming for catalog titles that require a
//             subscription. Title purchase and rental are available per movie
//             where priced.
//           </p>
//           <div className="mt-10 grid gap-6 md:grid-cols-3">
//             {[
//               {
//                 name: 'Free',
//                 price: '$0',
//                 desc: 'Browse, review, and use the community features.',
//                 cta: 'Get started',
//                 href: '/register',
//               },
//               {
//                 name: 'Monthly',
//                 price: 'Stripe',
//                 desc: 'Premium access billed monthly via checkout.',
//                 cta: 'Choose monthly',
//                 href: '/subscription?plan=MONTHLY',
//               },
//               {
//                 name: 'Yearly',
//                 price: 'Save 20%',
//                 desc: 'Best value for long-term viewers.',
//                 cta: 'Choose yearly',
//                 href: '/subscription?plan=YEARLY',
//               },
//             ].map((plan) => (
//               <div
//                 key={plan.name}
//                 className="flex flex-col rounded-xl border border-border/80 bg-background/80 p-6 shadow-sm"
//               >
//                 <h3 className="text-lg font-semibold">{plan.name}</h3>
//                 <p className="mt-2 text-3xl font-bold tabular-nums">
//                   {plan.price}
//                 </p>
//                 <p className="mt-3 flex-1 text-sm text-muted-foreground">
//                   {plan.desc}
//                 </p>
//                 <Button className="mt-6" asChild variant="secondary">
//                   <Link href={plan.href}>{plan.cta}</Link>
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import Link from 'next/link';
// import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
// import { MediaCard } from '@/components/media/MediaCard';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { getMediaList } from '@/services/media.server';
// import { HeroSearch } from '@/components/hero/HeroSearch';

// export default async function HomePage({
//   searchParams,
// }: {
//   searchParams: Promise<{ q?: string; genre?: string }>;
// }) {
//   const { q = '', genre = '' } = await searchParams;

//   const [topRated, newlyAdded, editorsPicks] = await Promise.all([
//     getMediaList({ sort: 'top', limit: 8 }),
//     getMediaList({ sort: 'latest', limit: 8 }),
//     getMediaList({ editorsPick: true, limit: 8 }),
//   ]);

//   return (
//     <div>
//       {/* ── Hero ── */}
//       <section
//         className={[
//           'relative overflow-hidden border-b border-border',
//           'bg-background',
//           'min-h-[70vh] max-h-[80vh]',
//           'flex flex-col items-center justify-center',
//         ].join(' ')}
//       >
//         {/* Subtle radial accent — pure CSS, no gradient image */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-0 flex items-center justify-center"
//         >
//           <div className="h-240 w-240 rounded-full bg-primary/8 blur-[120px]" />
//         </div>

//         <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
//           {/* Animated badge */}
//           <Badge
//             variant="secondary"
//             className="mb-5 animate-fade-in gap-1.5 px-3 py-1"
//           >
//             <Sparkles className="size-3 text-primary" />
//             Rate · Review · Stream
//           </Badge>

//           <h1 className="animate-fade-in text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
//             Your portal for{' '}
//             <span className="text-primary">movies &amp; series</span>
//           </h1>

//           <p className="mt-4 max-w-xl animate-fade-in text-pretty text-muted-foreground sm:text-lg">
//             Search the library, read curated reviews, build your watchlist, and
//             unlock premium streaming with a subscription.
//           </p>

//           {/* Genre filter chips + search — client component */}
//           <HeroSearch initialQ={q} initialGenre={genre} />

//           {/* Stats row */}
//           <div className="mt-8 flex animate-fade-in items-center gap-6 text-center">
//             {[
//               { value: '12k+', label: 'Titles' },
//               { value: '340k', label: 'Reviews' },
//               { value: 'Free', label: 'to get started' },
//             ].map((s, i) => (
//               <div key={s.label} className="flex items-center gap-6">
//                 {i > 0 && <div className="h-8 w-px bg-border" aria-hidden />}
//                 <div>
//                   <p className="text-lg font-semibold tabular-nums text-foreground">
//                     {s.value}
//                   </p>
//                   <p className="text-xs text-muted-foreground">{s.label}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Scroll cue — bounces to invite scrolling */}
//         <div className="absolute bottom-5 flex animate-bounce flex-col items-center gap-1">
//           <ChevronDown className="size-5 text-muted-foreground/50" />
//           <span className="text-[11px] text-muted-foreground/40">
//             Scroll to explore
//           </span>
//         </div>
//       </section>

//       {/* ── Top rated ── */}
//       <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight">Top rated</h2>
//             <p className="text-sm text-muted-foreground">
//               Highest average scores in the catalog
//             </p>
//           </div>
//           <Button variant="ghost" asChild>
//             <Link href="/browse?sort=top">
//               View all <ArrowRight className="ml-1 size-3.5" />
//             </Link>
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//           {topRated.data.slice(0, 8).map((m) => (
//             <MediaCard key={m.id} media={m} />
//           ))}
//         </div>
//       </section>

//       {/* ── Newly added ── */}
//       <section className="border-y border-border/60 bg-muted/20 py-12">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6">
//           <div className="mb-6 flex items-end justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-semibold tracking-tight">
//                 Newly added
//               </h2>
//               <p className="text-sm text-muted-foreground">
//                 Recently added titles
//               </p>
//             </div>
//             <Button variant="ghost" asChild>
//               <Link href="/browse?sort=latest">
//                 View all <ArrowRight className="ml-1 size-3.5" />
//               </Link>
//             </Button>
//           </div>
//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//             {newlyAdded.data.slice(0, 8).map((m) => (
//               <MediaCard key={m.id} media={m} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Editor's picks ── */}
//       <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight">
//               Editor&apos;s picks
//             </h2>
//             <p className="text-sm text-muted-foreground">
//               Hand-picked highlights from the team
//             </p>
//           </div>
//           <Button variant="ghost" asChild>
//             <Link href="/browse?editorsPick=1">
//               View all <ArrowRight className="ml-1 size-3.5" />
//             </Link>
//           </Button>
//         </div>
//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//           {editorsPicks.data.length === 0 && (
//             <p className="col-span-full text-sm text-muted-foreground">
//               No editor picks yet — admins can flag titles in the media library.
//             </p>
//           )}
//           {editorsPicks.data.map((m) => (
//             <MediaCard key={m.id} media={m} />
//           ))}
//         </div>
//       </section>

//       {/* ── Plans ── */}
//       <section className="border-t border-border/80 bg-card/40 py-14">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6">
//           <h2 className="text-center text-2xl font-semibold tracking-tight">
//             Subscription plans
//           </h2>
//           <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
//             Premium unlocks streaming for catalog titles that require a
//             subscription. Per-title purchase and rental available where priced.
//           </p>
//           <div className="mt-10 grid gap-6 md:grid-cols-3">
//             {[
//               {
//                 name: 'Free',
//                 price: '$0',
//                 period: 'forever',
//                 desc: 'Browse, review, and use all community features.',
//                 cta: 'Get started',
//                 href: '/register',
//                 featured: false,
//               },
//               {
//                 name: 'Monthly',
//                 price: 'via Stripe',
//                 period: 'billed monthly',
//                 desc: 'Full catalog streaming access, billed monthly.',
//                 cta: 'Choose monthly',
//                 href: '/subscription?plan=MONTHLY',
//                 featured: true,
//               },
//               {
//                 name: 'Yearly',
//                 price: 'Save 20%',
//                 period: 'billed annually',
//                 desc: 'Best value for long-term viewers.',
//                 cta: 'Choose yearly',
//                 href: '/subscription?plan=YEARLY',
//                 featured: false,
//               },
//             ].map((plan) => (
//               <div
//                 key={plan.name}
//                 className={[
//                   'flex flex-col rounded-xl border bg-background p-6',
//                   plan.featured
//                     ? 'border-primary ring-1 ring-primary/30'
//                     : 'border-border/80',
//                 ].join(' ')}
//               >
//                 {plan.featured && (
//                   <span className="mb-3 self-start rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
//                     Most popular
//                   </span>
//                 )}
//                 <h3 className="text-lg font-semibold">{plan.name}</h3>
//                 <p className="mt-1 text-2xl font-bold tabular-nums">
//                   {plan.price}
//                 </p>
//                 <p className="text-xs text-muted-foreground">{plan.period}</p>
//                 <p className="mt-3 flex-1 text-sm text-muted-foreground">
//                   {plan.desc}
//                 </p>
//                 <Button
//                   className="mt-6"
//                   variant={plan.featured ? 'default' : 'secondary'}
//                   asChild
//                 >
//                   <Link href={plan.href}>{plan.cta}</Link>
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ChevronDown,
  Play,
  Star,
  Bookmark,
  Tv2,
  Film,
  Laugh,
  Rocket,
  ShieldCheck,
  Zap,
  Globe,
} from 'lucide-react';
import { MediaCard } from '@/components/media/MediaCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HeroSearch } from '@/components/hero/HeroSearch';
import { NewsletterForm } from '@/components/home/NewsletterForm';
// import { FaqAccordion } from '@/components/home/FaqAccordion';
import { getMediaList } from '@/services/media.server';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { MediaCardSkeleton } from '@/components/media/MediaCardSkeleton';

/* ─── Static data (no dummy placeholder text) ─────────────────────── */

const CATEGORIES = [
  {
    label: 'Action',
    icon: Rocket,
    href: '/browse?genre=action',
    count: '1.2k titles',
  },
  {
    label: 'Drama',
    icon: Film,
    href: '/browse?genre=drama',
    count: '2.4k titles',
  },
  {
    label: 'Comedy',
    icon: Laugh,
    href: '/browse?genre=comedy',
    count: '980 titles',
  },
  {
    label: 'Sci-fi',
    icon: Globe,
    href: '/browse?genre=sci-fi',
    count: '640 titles',
  },
  {
    label: 'TV Series',
    icon: Tv2,
    href: '/browse?type=series',
    count: '3.1k titles',
  },
  {
    label: 'Top Rated',
    icon: Star,
    href: '/browse?sort=top',
    count: '500+ titles',
  },
  {
    label: 'Watchlisted',
    icon: Bookmark,
    href: '/watchlist',
    count: 'Your list',
  },
  {
    label: 'New Releases',
    icon: Play,
    href: '/browse?sort=latest',
    count: 'This month',
  },
];

const FEATURES = [
  {
    icon: Play,
    title: 'Stream in HD',
    desc: 'Premium subscribers get instant access to thousands of titles in high definition with no ads.',
  },
  {
    icon: Star,
    title: 'Community reviews',
    desc: 'Read and write detailed reviews, rate titles, and see what critics and members think.',
  },
  {
    icon: Bookmark,
    title: 'Personal watchlist',
    desc: 'Save titles to your watchlist and pick up where you left off across any device.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & secure',
    desc: 'Payments handled by Stripe. Your data is never sold to third parties.',
  },
  {
    icon: Zap,
    title: 'Instant access',
    desc: 'Purchase or rent individual titles without a subscription — pay only for what you watch.',
  },
  {
    icon: Globe,
    title: 'Global catalog',
    desc: 'Titles from over 80 countries, with subtitles and audio options in multiple languages.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create a free account',
    desc: 'Sign up in under a minute. Browse, review, and build your watchlist at no cost.',
  },
  {
    step: '02',
    title: 'Choose a plan or rent a title',
    desc: 'Unlock the full catalog with a Monthly or Yearly subscription, or rent individual titles.',
  },
  {
    step: '03',
    title: 'Watch, rate, and share',
    desc: 'Stream instantly, leave a review, and share recommendations with the community.',
  },
];

const STATS = [
  { value: 12000, suffix: '+', label: 'Titles in catalog' },
  { value: 340000, suffix: '', label: 'Community reviews' },
  { value: 80, suffix: '+', label: 'Countries covered' },
  { value: 99, suffix: '%', label: 'Uptime last 12 mo.' },
];

const TESTIMONIALS = [
  {
    name: 'Amara Singh',
    role: 'Subscriber since 2023',
    quote:
      "CineTube's catalog is enormous and the review system actually helps me find hidden gems I'd never have discovered on my own.",
    rating: 5,
  },
  {
    name: 'Carlos Mendez',
    role: 'Film critic',
    quote:
      "The editor's picks section is genuinely curated — not just whatever's trending. A refreshing approach to streaming.",
    rating: 5,
  },
  {
    name: 'Yuki Tanaka',
    role: 'Annual subscriber',
    quote:
      'Switching from monthly to yearly saved me a lot. The watchlist sync across devices works flawlessly.',
    rating: 4,
  },
];

const FAQS = [
  {
    q: 'Can I watch content without a subscription?',
    a: 'Yes. Free accounts can browse the full catalog, read and write reviews, and manage a watchlist. Some titles are available to rent or purchase individually without a subscription.',
  },
  {
    q: 'How does the subscription work?',
    a: 'Choose Monthly or Yearly billing. Your subscription is processed securely through Stripe and gives you unlimited streaming access to all subscription-eligible titles.',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Absolutely. You can cancel from your profile page at any point. You keep access until the end of your current billing period.',
  },
  {
    q: 'What is the difference between renting and purchasing a title?',
    a: 'Renting gives you a limited viewing window (typically 48 hours). Purchasing adds the title permanently to your library, accessible from your Purchases page.',
  },
  {
    q: "How are editor's picks selected?",
    a: "Editors with admin access flag titles they consider exceptional. It's a human-curated list, not an algorithm — think of it as a trusted recommendation from a film-loving friend.",
  },
  {
    q: 'Is my payment information stored on CineTube?',
    a: 'No. All payment processing is handled by Stripe. CineTube never stores your card details.',
  },
];

/* ─── Page ─────────────────────────────────────────────────────────── */

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
  const { q = '', genre = '' } = await searchParams;

  const [topRated, newlyAdded, editorsPicks, trending] = await Promise.all([
    getMediaList({ sort: 'top', limit: 8 }),
    getMediaList({ sort: 'latest', limit: 8 }),
    getMediaList({ editorsPick: true, limit: 8 }),
    getMediaList({ sort: 'top', limit: 1 }), // spotlight card
  ]);

  const spotlight = trending.data[0] ?? null;

  return (
    <div>
      {/* ══════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-border min-h-[60vh] max-h-[70vh] flex flex-col items-center justify-center bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="h-120 w-120 rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
          <Badge
            variant="secondary"
            className="mb-5 animate-fade-in gap-1.5 px-3 py-1"
          >
            <Sparkles className="size-3 text-primary" />
            Rate · Review · Stream
          </Badge>

          <h1 className="animate-fade-in text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your portal for{' '}
            <span className="text-primary">movies &amp; series</span>
          </h1>

          <p className="mt-4 max-w-xl animate-fade-in text-pretty text-muted-foreground sm:text-lg">
            Search the library, read curated reviews, build your watchlist, and
            unlock premium streaming.
          </p>

          <HeroSearch initialQ={q} initialGenre={genre} />

          <div className="mt-8 flex animate-fade-in items-center gap-6 text-center">
            {STATS.slice(0, 3).map((s, i) => (
              <div key={s.label} className="flex items-center gap-6">
                {i > 0 && <div className="h-8 w-px bg-border" aria-hidden />}
                <div>
                  <p className="text-lg font-semibold tabular-nums text-foreground">
                    {s.value.toLocaleString()}
                    {s.suffix}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 flex animate-bounce flex-col items-center gap-1">
          <ChevronDown className="size-5 text-muted-foreground/50" />
          <span className="text-[11px] text-muted-foreground/40">
            Scroll to explore
          </span>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. TRENDING SPOTLIGHT
      ══════════════════════════════════════════ */}
      {spotlight && (
        <section className="border-b border-border bg-secondary/10 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Trending now
                </h2>
                <p className="text-sm text-muted-foreground">
                  The highest-rated title in the catalog right now
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card md:flex-row">
              {/* Poster */}
              <div className="relative aspect-2/3 w-full shrink-0 overflow-hidden md:w-56">
                {spotlight.posterUrl ? (
                  <Image
                    src={spotlight.posterUrl}
                    alt={spotlight.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="224px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Film className="size-10 text-muted-foreground/40" />
                  </div>
                )}
                <div className="absolute left-3 top-3">
                  <Badge className="bg-primary text-primary-foreground">
                    <Zap className="mr-1 size-3" /> Trending
                  </Badge>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {(spotlight as any).type ?? 'Film'}
                </p>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {spotlight.title}
                </h3>

                {spotlight.averageRating != null && (
                  <div className="mt-3 flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${
                          i < Math.round(spotlight.averageRating / 2)
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">
                      {spotlight.averageRating.toFixed(1)} / 10
                    </span>
                  </div>
                )}

                {(spotlight as any).description && (
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {(spotlight as any).description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={`/media/${spotlight.id}`}>
                      <Play className="size-4" /> Watch now
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href={`/media/${spotlight.id}`}>View details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          3. CATEGORIES
      ══════════════════════════════════════════ */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Browse by category
            </h2>
            <p className="text-sm text-muted-foreground">
              Jump straight into the genre or format you want
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORIES.map(({ label, icon: Icon, href, count }) => (
              <Link
                key={label}
                href={href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{label}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {count}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. TOP RATED
      ══════════════════════════════════════════ */}
      <section className="border-t border-border/60 bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
              <Link href="/browse?sort=top">
                View all <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {topRated.data.slice(0, 8).map((m) => (
              <MediaCard key={m.id} media={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. PLATFORM FEATURES
      ══════════════════════════════════════════ */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything you need in one place
            </h2>
            <p className="mt-3 text-muted-foreground">
              CineTube is built around three pillars: a great catalog, an honest
              community, and flexible access.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <span className="mb-4 flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. NEWLY ADDED
      ══════════════════════════════════════════ */}
      <section className="border-y border-border/60 bg-muted/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Newly added
              </h2>
              <p className="text-sm text-muted-foreground">
                Fresh titles added to the catalog
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/browse?sort=latest">
                View all <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {newlyAdded.data.slice(0, 8).map((m) => (
              <MediaCard key={m.id} media={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How CineTube works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Get from sign-up to streaming in three simple steps.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} className="relative flex flex-col items-start">
                {/* Connector line between steps */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-[calc(50%+2.5rem)] top-6 hidden h-px w-[calc(100%-2rem)] bg-border md:block"
                  />
                )}
                <div className="mb-4 flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-primary font-bold text-sm">
                  {step}
                </div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Get started free <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          8. STATISTICS
      ══════════════════════════════════════════ */}
      <section className="border-y border-border bg-secondary/10 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Trusted by film lovers worldwide
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Numbers that reflect a growing, active community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map(({ value, suffix, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
              >
                <p className="text-4xl font-bold tabular-nums text-primary">
                  {value >= 1000 ? `${Math.round(value / 1000)}k` : value}
                  {suffix}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          9. EDITOR'S PICKS
      ══════════════════════════════════════════ */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
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
              <Link href="/browse?editorsPick=1">
                View all <ArrowRight className="ml-1 size-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {editorsPicks.data.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">
                No editor picks yet — admins can flag titles in the media
                library.
              </p>
            )}
            {editorsPicks.data.map((m) => (
              <MediaCard key={m.id} media={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          10. TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="border-t border-border/60 bg-muted/20 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              What members say
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Real feedback from the CineTube community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ name, role, quote, rating }) => (
              <div
                key={name}
                className="flex flex-col rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < rating
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          11. NEWSLETTER
      ══════════════════════════════════════════ */}
      <section className="border-t border-border py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
            <Badge variant="secondary" className="mb-4 gap-1">
              <Sparkles className="size-3 text-primary" /> Weekly digest
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Stay in the loop
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Get a weekly roundup of new arrivals, editor picks, and community
              highlights — straight to your inbox. No spam, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          12. FAQ
      ══════════════════════════════════════════ */}
      <section className="border-t border-border/60 bg-muted/20 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Everything you need to know before getting started.
            </p>
          </div>
          <FaqAccordion items={FAQS} />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Still have questions?{' '}
            <Link
              href="/about"
              className="font-medium text-primary hover:underline"
            >
              Visit our about page
            </Link>{' '}
            or reach out via the contact form.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          13. FINAL CTA + PLANS
      ══════════════════════════════════════════ */}
      <section className="border-t border-border bg-card/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to start watching?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pick the plan that fits. Upgrade, downgrade, or cancel anytime.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: 'Free',
                price: '$0',
                period: 'forever',
                desc: 'Browse, review, and manage a watchlist at no cost.',
                cta: 'Get started',
                href: '/register',
                featured: false,
              },
              {
                name: 'Monthly',
                price: 'Billed via Stripe',
                period: 'month-to-month',
                desc: 'Full catalog streaming access, cancel anytime.',
                cta: 'Choose monthly',
                href: '/subscription?plan=MONTHLY',
                featured: true,
              },
              {
                name: 'Yearly',
                price: 'Save 20%',
                period: 'billed annually',
                desc: 'Best value for viewers who watch regularly.',
                cta: 'Choose yearly',
                href: '/subscription?plan=YEARLY',
                featured: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={[
                  'flex flex-col rounded-xl border bg-background p-6',
                  plan.featured
                    ? 'border-primary ring-1 ring-primary/30'
                    : 'border-border/80',
                ].join(' ')}
              >
                {plan.featured && (
                  <span className="mb-3 self-start rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-2xl font-bold tabular-nums">
                  {plan.price}
                </p>
                <p className="text-xs text-muted-foreground">{plan.period}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {plan.desc}
                </p>
                <Button
                  className="mt-6"
                  variant={plan.featured ? 'default' : 'secondary'}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-lg font-semibold">Not ready to commit?</p>
            <p className="max-w-md text-sm text-muted-foreground">
              Start with a free account. No credit card required.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/register">
                Create free account <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
