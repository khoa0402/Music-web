import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import type { Song } from "@/types";
import { Play, Volume2 } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, togglePlaySong, isPlaying, setCurrentSong } =
    usePlayerStore();
  const isCurrentSong = song._id === currentSong?._id;

  const handlePlaySong = () => {
    if (isCurrentSong) togglePlaySong();
    else setCurrentSong(song);
  };
  return (
    <Button
      variant={"ghost"}
      onClick={() => handlePlaySong()}
      className={`size-6 absolute bottom-3 right-1 hover:scale-105 transition-all 
				opacity-0 group-hover:translate-y-0 ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentSong && isPlaying ? (
        <Volume2 className="text-green-400 fill-green-400" />
      ) : (
        <Play className="text-green-400 fill-green-400" />
      )}
    </Button>
  );
};

export default PlayButton;
