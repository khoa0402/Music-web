import type { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  isRepeat: boolean;
  isShuffle: boolean;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlaySong: () => void;
  playNextSong: () => void;
  playPreviousSong: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  isRepeat: false,
  isShuffle: false,

  initializeQueue: (songs: Song[]) =>
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    }),

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);

    set({
      currentSong: song,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
      isPlaying: true,
    });
  },

  togglePlaySong: () => set({ isPlaying: !get().isPlaying }),

  playNextSong: () => {
    const { currentIndex, queue, isShuffle } = get();
    let nextIndex;
    if (isShuffle) {
      if (queue.length === 1) nextIndex = 0;
      else {
        do {
          nextIndex = Math.floor(Math.random() * queue.length);
        } while (nextIndex === currentIndex);
      }
    } else {
      nextIndex = currentIndex + 1 < queue.length ? currentIndex + 1 : 0;
    }

    set({
      currentSong: queue[nextIndex],
      currentIndex: nextIndex,
      isPlaying: true,
    });
  },

  playPreviousSong: () => {
    const { currentIndex, queue } = get();
    const previousIndex = currentIndex - 1;

    if (previousIndex >= 0) {
      set({
        currentSong: queue[previousIndex],
        currentIndex: previousIndex,
        isPlaying: true,
      });
    } else {
      set({
        currentSong: queue[queue.length - 1],
        currentIndex: queue.length - 1,
        isPlaying: true,
      });
    }
  },

  toggleRepeat: () => set({ isRepeat: !get().isRepeat }),

  toggleShuffle: () => set({ isShuffle: !get().isShuffle }),
}));
