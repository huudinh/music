import { create } from "zustand";

export interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

interface PlayerState {
    playlist: Song[];
    currentIndex: number;
    isPlaying: boolean;

    setPlaylist: (list: Song[]) => void;
    setSong: (index: number) => void;

    play: () => void;
    pause: () => void;
    togglePlay: () => void;

    next: () => void;
    prev: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    playlist: [],
    currentIndex: 0,
    isPlaying: false,

    setPlaylist: (list) =>
        set({
            playlist: list,
            currentIndex: 0,
            isPlaying: false,
        }),

    setSong: (index) =>
        set({
            currentIndex: index,
            isPlaying: true,
        }),

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),

    togglePlay: () =>
        set((state) => ({
            isPlaying: !state.isPlaying,
        })),

    next: () => {
        const { currentIndex, playlist } = get();
        set({
            currentIndex: (currentIndex + 1) % playlist.length,
            isPlaying: true,
        });
    },

    prev: () => {
        const { currentIndex, playlist } = get();
        set({
            currentIndex:
                (currentIndex - 1 + playlist.length) % playlist.length,
            isPlaying: true,
        });
    },
}));
