"use client";

import { createContext, useContext, useRef, useState } from "react";
import { songs } from "@/data/songs";

const PlayerContext = createContext<any>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSong = (song: any) => {
        setCurrentSong(song);
        setTimeout(() => {
            audioRef.current?.play();
            setIsPlaying(true);
        }, 100);
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <PlayerContext.Provider value={{
            audioRef,
            currentSong,
            playSong,
            togglePlay,
            isPlaying
        }}>
            {children}
            <audio ref={audioRef} src={currentSong.src} />
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);
