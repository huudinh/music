import { create } from "zustand";
import { persist } from "zustand/middleware";

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

    // Actions
    setPlaylist: (list: Song[]) => void;
    setSong: (index: number, autoplay?: boolean) => void;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    next: () => void;
    prev: () => void;

    // Getters
    currentSong: Song | null;
    hasSongs: boolean;
    isFirstSong: boolean;
    isLastSong: boolean;
}

export const usePlayerStore = create<PlayerState>()(
    persist(
        (set, get) => ({
            playlist: [],
            currentIndex: 0,
            isPlaying: false,

            // ⚠️ KHÔNG auto play khi set playlist
            setPlaylist: (list) =>
                set({
                    playlist: list,
                }),

            // Cho phép kiểm soát autoplay
            setSong: (index, autoplay = true) =>
                set({
                    currentIndex: index,
                    isPlaying: autoplay,
                }),

            play: () => set({ isPlaying: true }),
            pause: () => set({ isPlaying: false }),

            togglePlay: () =>
                set((state) => ({
                    isPlaying: !state.isPlaying,
                })),

            next: () => {
                const { playlist, currentIndex } = get();
                if (playlist.length === 0) return;

                const nextIndex = (currentIndex + 1) % playlist.length;
                set({
                    currentIndex: nextIndex,
                    isPlaying: true,
                });
            },

            prev: () => {
                const { playlist, currentIndex } = get();
                if (playlist.length === 0) return;

                const prevIndex =
                    (currentIndex - 1 + playlist.length) % playlist.length;
                set({
                    currentIndex: prevIndex,
                    isPlaying: true,
                });
            },

            // ===== GETTERS =====
            get currentSong() {
                const { playlist, currentIndex } = get();
                return playlist.length > 0 ? playlist[currentIndex] : null;
            },

            get hasSongs() {
                return get().playlist.length > 0;
            },

            get isFirstSong() {
                return get().currentIndex === 0;
            },

            get isLastSong() {
                const { playlist, currentIndex } = get();
                return (
                    playlist.length > 0 &&
                    currentIndex === playlist.length - 1
                );
            },
        }),
        {
            name: "player-storage",

            // 🔑 CHỈ lưu state cần cho reload
            partialize: (state) => ({
                currentIndex: state.currentIndex,
                isPlaying: state.isPlaying,
            }),
        }
    )
);
