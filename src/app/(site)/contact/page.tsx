import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground">
        Demo form — wire to your email API or support tool when you deploy.
      </p>
      <form className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" rows={5} />
        </div>
        <Button type="button" variant="secondary">
          Send (demo)
        </Button>
      </form>
    </div>
  );
}
