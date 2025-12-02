import { Skeleton } from './ui/skeleton';

export function ProjectCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function ProjectsGridSkeleton() {
  return (
    <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
      <Skeleton className="h-12 w-48 mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="pt-32 pb-24 px-8 max-w-[1400px] mx-auto">
      <Skeleton className="h-12 w-64 mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
