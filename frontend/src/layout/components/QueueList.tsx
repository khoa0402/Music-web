import { usePlayerStore } from "@/stores/usePlayerStore";
import { Music } from "lucide-react";

const QueueList = () => {
  const { queue, currentIndex, setCurrentSong } = usePlayerStore();

  if (!queue || queue.length === 0) {
    return <p className="text-zinc-400">Empty List</p>;
  }

  return (
    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2">
      {queue.map((song, index) => {
        const isPlaying = index === currentIndex; // chỉ bài hiện tại
        return (
          <div
            key={song._id + index} // tránh duplicate key
            className={`p-2 rounded cursor-pointer hover:bg-zinc-800 transition ${
              isPlaying
                ? "bg-green-600/30 flex items-center justify-between"
                : ""
            }`}
            onClick={() => setCurrentSong(song)}
          >
            <div className="flex-1">
              <div className="font-medium truncate">{song.title}</div>
              <div className="text-sm text-zinc-400 truncate">
                {song.artist}
              </div>
            </div>
            {isPlaying && (
              <span className="ml-2 text-indigo-400">
                <Music />
              </span>
            )}{" "}
            {/* icon nhạc */}
          </div>
        );
      })}
    </div>
  );
};

export default QueueList;
