import { cn } from '@/lib/utils';

// export function MediaCardSkeleton({ className }: { className?: string }) {
//   return (
//     <div
//       className={cn(
//         'flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card',
//         className,
//       )}
//       aria-busy="true"
//       aria-label="Loading media"
//     >
//       {/* Poster */}
//       <div className="aspect-[2/3] w-full animate-pulse bg-muted" />

//       {/* Body */}
//       <div className="flex flex-1 flex-col gap-2 p-3">
//         {/* Title */}
//         <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />

//         {/* Synopsis lines */}
//         <div className="space-y-1.5">
//           <div className="h-3 w-full animate-pulse rounded bg-muted" />
//           <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
//         </div>

//         {/* Meta pills */}
//         <div className="mt-auto flex gap-1.5 pt-1">
//           <div className="h-4 w-8 animate-pulse rounded bg-muted" />
//           <div className="h-4 w-14 animate-pulse rounded bg-muted" />
//           <div className="h-4 w-10 animate-pulse rounded bg-muted" />
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="flex gap-2 border-t border-border p-3">
//         <div className="h-8 flex-1 animate-pulse rounded-md bg-muted" />
//         <div className="h-8 w-16 animate-pulse rounded-md bg-muted" />
//       </div>
//     </div>
//   );
// }

export function MediaCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card animate-pulse">
      <div className="aspect-[2/3] w-full bg-muted" />
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
        <div className="mt-auto flex gap-1.5 pt-1">
          <div className="h-4 w-10 rounded bg-muted" />
          <div className="h-4 w-14 rounded bg-muted" />
        </div>
      </div>
      <div className="flex gap-2 border-t border-border p-3">
        <div className="h-8 flex-1 rounded bg-muted" />
        <div className="h-8 w-16 rounded bg-muted" />
      </div>
    </div>
  );
}
