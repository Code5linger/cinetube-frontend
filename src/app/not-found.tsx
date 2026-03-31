import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">This page could not be found.</p>
      <Button className="mt-8" asChild>
        <Link href="/">Back home</Link>
      </Button>
    </div>
  );
}
