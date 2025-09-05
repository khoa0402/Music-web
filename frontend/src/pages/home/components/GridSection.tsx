import GridSectionSkeleton from "@/components/skeletons/GridSectionSkeleton.tsx";
import type { Song } from "@/types";
import PlayButton from "./PlayButton";

type GridSectionProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const GridSection = ({ title, songs, isLoading }: GridSectionProps) => {
  if (isLoading) return <GridSectionSkeleton />;
  return (
    <div className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md overflow-hidden shadow-lg">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <PlayButton song={song} />
              </div>
            </div>
            <h3 className="text-sm font-medium truncate mb-2">{song.title}</h3>
            <p className="text-zinc-400 text-xs truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridSection;
