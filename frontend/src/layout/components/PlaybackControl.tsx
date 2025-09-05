import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatDuration2 } from "@/pages/album/AlbumPage.tsx";
import { usePlayerStore } from "@/stores/usePlayerStore.ts";
import {
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QueueList from "./QueueList.tsx";

const PlaybackControl = () => {
  const {
    currentSong,
    isPlaying,
    togglePlaySong,
    playNextSong,
    playPreviousSong,
    isRepeat,
    toggleRepeat,
    isShuffle,
    toggleShuffle,
  } = usePlayerStore();
  const [volume, setVolume] = useState(50);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openListDialog, setOpenListDialog] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("durationchange", updateDuration);

    const handleEnded = () => {
      if (!isRepeat) {
        usePlayerStore.setState({ isPlaying: false });
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleDurationChanged = (value: number[]) => {
    if (audioRef.current) audioRef.current.currentTime = value[0];
  };

  const isMuted = volume === 0;

  const handleVolumeChanged = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Khôi phục volume cũ
        setVolume(previousVolume);
        audioRef.current.volume = previousVolume / 100;
      } else {
        // Lưu lại volume trước khi mute
        setPreviousVolume(volume);
        setVolume(0);
        audioRef.current.volume = 0;
      }
    }
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1200px] mx-auto">
        {/* Bài hát đang phát */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[35%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover"
              />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="font-medium hover:text-blue-500 cursor-pointer truncate">
                  {currentSong.title}
                </div>
                <div className="text-xs text-zinc-400 hover:text-blue-500 cursor-pointer truncate">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>
        {/* Thực hành phát bài hát */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[40%]">
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatDuration2(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:bg-green-500/40 "
              onValueChange={handleDurationChanged}
            />

            <div className="text-xs text-zinc-400">
              {formatDuration2(duration)}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-green-400 text-zinc-400"
              onClick={() => toggleShuffle()}
            >
              <Shuffle
                className={isShuffle ? "text-green-400" : "text-zinc-400"}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-green-400 text-zinc-400"
              onClick={() => playPreviousSong()}
              disabled={!currentSong}
            >
              <SkipBack />
            </Button>
            <Button
              size="icon"
              className="bg-white hover:bg-green-400/80 text-black rounded-full h-11 w-11"
              onClick={() => togglePlaySong()}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="fill-black" />
              ) : (
                <Play className="fill-black" />
              )}
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-green-400 text-zinc-400"
              onClick={() => playNextSong()}
              disabled={!currentSong}
            >
              <SkipForward />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-green-400 text-zinc-400"
              onClick={() => toggleRepeat()}
            >
              <Repeat
                className={isRepeat ? "text-green-400" : "text-zinc-400"}
              />
            </Button>
          </div>
        </div>
        {/* Chỉnh âm lượng */}
        <div className="hidden sm:flex items-center min-w-[180px] w-[30%] justify-end">
          <Dialog open={openListDialog} onOpenChange={setOpenListDialog}>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className={
                  openListDialog
                    ? "text-green-500"
                    : "text-zinc-400 hover:text-green-400"
                }
              >
                <ListMusic />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle>Danh sách phát</DialogTitle>
              </DialogHeader>
              <QueueList />
            </DialogContent>
          </Dialog>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-green-400 text-zinc-400"
              onClick={() => handleVolumeChanged()}
            >
              {isMuted ? <Volume /> : <Volume2 />}
            </Button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-20 hover:bg-green-500/40"
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
            <span className="text-xs text-zinc-400 w-2">{volume}%</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlaybackControl;
