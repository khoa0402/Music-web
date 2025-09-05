import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton.tsx";
import { useMusicStore } from "@/stores/useMusicStore.ts";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();
  if (isLoading) return <FeaturedGridSkeleton />;
  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 cursor-pointer transition-all group relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4 min-w-0 max-w-[14rem]">
            <p className="text-sm font-medium truncate">{song.title}</p>
            <p className="text-zinc-400 text-xs truncate">{song.artist}</p>
          </div>
          {/* Thêm biểu tượng cho bài hát đang phát */}
          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
