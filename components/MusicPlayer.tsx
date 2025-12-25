"use client";

import { usePlayer } from "@/context/PlayerContext";

export default function MusicPlayer() {
    const { currentSong, togglePlay, isPlaying } = usePlayer();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between">
            <div>
                <strong>{currentSong.title}</strong>
                <p className="text-sm">{currentSong.artist}</p>
            </div>

            <button
                onClick={togglePlay}
                className="px-4 py-2 bg-white text-black rounded"
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
}
