const items = [
  {
    q: "How do reviews get published?",
    a: "New reviews are held for admin approval. Once approved, they appear on the title page and in the public reviews feed.",
  },
  {
    q: "How does premium streaming work?",
    a: "Titles marked PREMIUM may hide the stream URL until you have an active subscription or a valid purchase or rental entitlement. This is enforced by the backend.",
  },
  {
    q: "Which payments are supported?",
    a: "The backend integrates with Stripe for subscriptions and title checkout. Configure keys and FRONTEND_URL in your API environment.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">FAQ</h1>
      <ul className="mt-8 space-y-8">
        {items.map((item) => (
          <li key={item.q}>
            <h2 className="text-lg font-semibold">{item.q}</h2>
            <p className="mt-2 text-muted-foreground">{item.a}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
