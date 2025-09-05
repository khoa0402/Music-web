import { Skeleton } from "../ui/skeleton";

const GridSectionSkeleton = () => {
  return (
    <div className="mb-8">
      <Skeleton className="h-8 w-48 bg-zinc-800 rounded mb-6 " />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-800/40 p-4 rounded-md animate-pulse"
          >
            <Skeleton className="aspect-square rounded-md bg-zinc-700 mb-4" />
            <Skeleton className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
            <Skeleton className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridSectionSkeleton;
