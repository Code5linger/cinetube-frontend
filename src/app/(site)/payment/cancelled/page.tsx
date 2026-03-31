import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentCancelledPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <h1 className="text-2xl font-bold tracking-tight">Checkout cancelled</h1>
      <p className="mt-3 text-muted-foreground">
        No charge was made. You can try again anytime.
      </p>
      <Button className="mt-8" asChild variant="secondary">
        <Link href="/subscription">Back to plans</Link>
      </Button>
    </div>
  );
}
