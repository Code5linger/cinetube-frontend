"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { data: user, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="mt-2 text-muted-foreground">Log in to view your profile.</p>
        <Button className="mt-6" asChild>
          <Link href="/login?redirect=/profile">Log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <div className="mt-8 rounded-xl border border-border/80 bg-card/40 p-6">
        <p className="text-sm text-muted-foreground">Name</p>
        <p className="text-lg font-medium">{user.name ?? "—"}</p>
        <p className="mt-4 text-sm text-muted-foreground">Email</p>
        <p className="text-lg font-medium">{user.email}</p>
        <p className="mt-4 text-sm text-muted-foreground">Role</p>
        <Badge variant="secondary" className="mt-1">
          {user.role}
        </Badge>
        <p className="mt-4 text-sm text-muted-foreground">Email verified</p>
        <p className="text-lg font-medium">
          {user.emailVerified ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}
