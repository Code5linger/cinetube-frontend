import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Displays a 1–10 rating as filled stars (maps to 5 visual stars, 2 pts each). */
export function RatingStars({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.min(10, Math.max(0, value));
  const filled = Math.round((clamped / 10) * 5);

  return (
    <div className={cn("flex items-center gap-0.5", className)} title={`${value}/10`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < filled
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40",
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium tabular-nums text-muted-foreground">
        {value.toFixed(1)}/10
      </span>
    </div>
  );
}
