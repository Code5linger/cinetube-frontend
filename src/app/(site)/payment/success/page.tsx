import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Payment successful</h1>
      <p className="mt-3 text-muted-foreground">
        Thanks — Stripe will confirm the session and your backend webhook will
        record access.
      </p>
      <p className="mt-4 font-mono text-xs text-muted-foreground">
        session_id: {sp.session_id ?? "—"}
      </p>
      <Button className="mt-8" asChild>
        <Link href="/browse">Browse titles</Link>
      </Button>
    </div>
  );
}
