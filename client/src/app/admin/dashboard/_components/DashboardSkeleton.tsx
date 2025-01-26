import { Skeleton } from "@/components/ui/skeleton";
import { Stack } from "@/components/ui/stack";

export function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <Stack justify={"between"}>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-8 w-[200px]" />
      </Stack>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="w-full max-w-[400px] rounded-2xl border bg-card p-6 shadow-sm">
      <div className="space-y-6">
        <Skeleton className="h-7 w-[120px]" />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-[100px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-[80px]" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-md bg-muted/50 p-3">
          <Skeleton className="h-5 w-[140px]" />
          <Skeleton className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
