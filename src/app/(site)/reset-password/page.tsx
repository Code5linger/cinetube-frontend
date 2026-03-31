"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/services/auth.service";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(searchParams.get("token") ?? "");
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("Missing token — open the link from your email.");
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ token: token.trim(), newPassword });
      toast.success("Password updated — sign in with your new password.");
      router.push("/login");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight">Set new password</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Token is usually provided in the reset link query string.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Input
            id="token"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste token if not in URL"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving…" : "Update password"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm">
        <Link href="/login" className="text-primary underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
