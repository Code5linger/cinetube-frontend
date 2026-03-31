export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">About CineTube</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        CineTube is a portfolio-grade movie and series portal: browse a curated
        catalog, leave moderated reviews, like and comment, manage a watchlist,
        and unlock premium streaming or per-title purchase and rental flows
        powered by Stripe on the backend.
      </p>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        This frontend is built with Next.js and Tailwind CSS, and talks to the
        CineTube Express API with Better Auth session cookies proxied in
        development for a smooth same-origin experience.
      </p>
    </div>
  );
}
