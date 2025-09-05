import { usePlayerStore } from "@/stores/usePlayerStore.ts";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNextSong } = usePlayerStore();

  //Xử lý logic play/pause cho bài hát
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  //Xử lý khi kết thúc bài hát
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleSongEnded = () => {
      const { isRepeat } = usePlayerStore.getState();

      if (isRepeat) {
        audio.currentTime = 0;
        usePlayerStore.setState({ isPlaying: true });
        setTimeout(() => {
          audio.play().catch((error) => {
            console.warn("Error in replaying song:", error);
          });
        }, 50);
      } else {
        playNextSong();
      }
    };

    if (audio) {
      audio.addEventListener("ended", handleSongEnded);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("ended", handleSongEnded);
      }
    };
  }, [playNextSong]);

  //Xử lý thay đổi bài hát
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    //Kiểm tra nếu là bài hát mới
    const isSongChanged = previousSongRef.current !== currentSong?.audioUrl;

    if (isSongChanged) {
      audio.src = currentSong?.audioUrl;
      //reset thời gian phát bài hát
      audio.currentTime = 0;
      previousSongRef.current = currentSong?.audioUrl;
    }
    if (isPlaying) audio.play();
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
