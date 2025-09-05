import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatDuration2 = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlaySong } =
    usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading || !currentAlbum) return null;

  const gradientColors = [
    "from-pink-500/70",
    "from-indigo-500/70",
    "from-green-500/70",
    "from-yellow-500/70",
    "from-red-500/70",
  ];

  const randomColor =
    gradientColors[Math.floor(Math.random() * gradientColors.length)];

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) {
      togglePlaySong();
    } else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlayAlbumIndex = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  const totalDuration = currentAlbum.songs.reduce(
    (acc, song) => acc + song.duration,
    0
  );

  const formatDuration1 = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      // Ví dụ: 1:05:09
      return `${hours} h ${minutes
        .toString()
        .padStart(2, "0")} mins ${remainingSeconds
        .toString()
        .padStart(2, "0")} secs`;
    } else {
      // Ví dụ: 5:09
      return `${minutes} mins ${remainingSeconds
        .toString()
        .padStart(2, "0")} secs`;
    }
  };

  return (
    <div className="overflow-hidden h-full">
      <Navbar />
      <ScrollArea className="h-full">
        {/* Nội dung chính */}
        <div className="relative h-full min-h-screen">
          {/* gradient cho background */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${randomColor} via-zinc-900/80 to-zinc-900 pointer-events-none`}
            aria-hidden="true"
          />
          {/* Nội dung */}
          <div className="relative z-10">
            <div className="flex p-8 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="size-48 shadow-xl"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-normal">PUBLIC PLAYLIST</p>
                <h2 className="text-7xl font-bold my-3">
                  {currentAlbum?.title}
                </h2>
                <div className="flex flex-col gap-2 text-base ">
                  <span className="font-normal text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span className="font-normal text-sm text-zinc-300">
                    • {currentAlbum?.releaseYear}, {currentAlbum?.songs.length}{" "}
                    songs, {formatDuration1(totalDuration)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-20 bg-zinc-800/10">
            {/* Nút Play */}
            <div className="px-8 py-4 flex items-center gap-4">
              <Button
                onClick={() => handlePlayAlbum()}
                className="size-12 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="fill-black" />
                ) : (
                  <Play className="fill-black" />
                )}
              </Button>
            </div>
            {/* Phần danh sách bài hát */}
            <div className="backdrop-blur-sm">
              {/* Tiêu đề danh sách */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 ">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>Duration</div>
              </div>
              {/* Danh sách bài hát */}
              <div className="px-8 bg-black/35">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlayAlbumIndex(index)}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-1 py-2 text-sm 
                      text-zinc-400 hover:bg-white/5 rounded-md cursor-pointer"
                      >
                        <div className="contents group/play">
                          <div className="flex items-center justify-center ">
                            {isCurrentSong && isPlaying ? (
                              <div className="size-4 text-green-500">♫</div>
                            ) : (
                              <span className="group-hover/play:hidden">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && (
                              <Play className="size-4 text-green-400 hidden group-hover/play:block group-hover/play:fill-green-400" />
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-10"
                            />
                            <div>
                              <div className={`font-medium text-white`}>
                                {song.title}
                              </div>
                              <div className="text-xs">{song.artist}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {song.createdAt.split("T")[0]}
                          </div>
                          <div className="flex items-center">
                            {formatDuration2(song.duration)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default AlbumPage;
