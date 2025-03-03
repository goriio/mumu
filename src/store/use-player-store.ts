import { create } from "zustand";
import { Music } from "~/types/music";

export type PlayerStore = {
  isPlaying: boolean;
  currentTrack: Music | null;
  playlist: Music[];
  volume: number;
  progress: number;
  play: (music: Music) => void;
  pause: () => void;
  resume: () => void;
  setPlaylist: (playlist: Music[]) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  volume: 100,
  progress: 0,
  play: (music) =>
    set({
      currentTrack: music,
      isPlaying: true,
    }),
  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),
  setPlaylist: (playlist) => set({ playlist }),
  setVolume: (volume) => set({ volume }),
  setProgress: (progress) => set({ progress }),
}));
