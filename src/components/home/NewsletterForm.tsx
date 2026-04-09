'use client';

import { useState } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual newsletter endpoint
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <CheckCircle className="size-8 text-primary" />
        <p className="font-medium">You&apos;re subscribed!</p>
        <p className="text-sm text-muted-foreground">
          Your first digest will arrive next week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="you@example.com"
            className="h-11"
            aria-label="Email address"
            aria-invalid={!!error}
            aria-describedby={error ? 'newsletter-error' : undefined}
            disabled={loading}
          />
        </div>
        <Button type="submit" size="lg" className="shrink-0" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Subscribing…
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </div>
      {error && (
        <p
          id="newsletter-error"
          role="alert"
          className="mt-2 text-left text-sm text-destructive"
        >
          {error}
        </p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        By subscribing you agree to receive weekly emails. Unsubscribe anytime.
      </p>
    </form>
  );
}
