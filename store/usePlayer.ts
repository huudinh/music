import { create } from "zustand";

export interface Song {
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface PlayerState {
    playlist: Song[];
    index: number;
    isPlaying: boolean;
    volume: number;
    progress: number;

    toggle: () => void;
    next: () => void;
    prev: () => void;
    setVolume: (v: number) => void;
    setProgress: (p: number) => void;
}

export const usePlayer = create<PlayerState>((set, get) => ({
    playlist: [
        {
            id: 1,
            title: "Hen Yeu",
            artist: "Định",
            src: "/music/hen-yeu.mp3",
            cover: "/images/hen-yeu.jpg"
        },
        {
            id: 2,
            title: "Mot Phut",
            artist: "Định",
            src: "/music/mot-phut.mp3",
            cover: "/images/mot-phut.jpg"
        },
        {
            id: 3,
            title: "Roi Xa",
            artist: "Định",
            src: "/music/roi-xa.mp3",
            cover: "/images/roi-xa.jpg"
        },
    ],
    index: 0,
    isPlaying: false,
    volume: 0.8,
    progress: 0,

    toggle: () =>
        set((s) => ({ isPlaying: !s.isPlaying })),

    next: () =>
        set((s) => ({
            index: (s.index + 1) % s.playlist.length,
            isPlaying: true,
        })),

    prev: () =>
        set((s) => ({
            index:
                s.index === 0
                    ? s.playlist.length - 1
                    : s.index - 1,
            isPlaying: true,
        })),

    setVolume: (v) => set({ volume: v }),
    setProgress: (p) => set({ progress: p }),
}));
