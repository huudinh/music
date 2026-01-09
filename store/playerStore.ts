// store/playerStore.ts
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

    // Actions
    setPlaylist: (list: Song[]) => void;
    setSong: (index: number) => void;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    next: () => void;
    prev: () => void;

    // Getters (tiện ích để lấy dữ liệu hiện tại)
    currentSong: Song | null;
    hasSongs: boolean;
    isFirstSong: boolean;
    isLastSong: boolean;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    playlist: [],
    currentIndex: 0,
    isPlaying: false,

    // Đặt playlist mới và bắt đầu từ bài đầu
    setPlaylist: (list) =>
        set({
            playlist: list,
            currentIndex: 0,
            isPlaying: list.length > 0, // Tự động phát nếu có bài
        }),

    // Chuyển đến bài hát theo index
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

        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        set({
            currentIndex: prevIndex,
            isPlaying: true,
        });
    },

    // === GETTERS (rất hữu ích cho component) ===
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
        return playlist.length > 0 && currentIndex === playlist.length - 1;
    },
}));