import { Skeleton } from "../ui/skeleton";

const PlaylistSkeleton = () => {
  return Array.from({ length: 12 }).map((_, index) => (
    <div key={index} className="flex items-center pb-1 pl-4 rounded-md">
      <Skeleton className="h-5 w-[12rem]" />
    </div>
  ));
};

export default PlaylistSkeleton;
