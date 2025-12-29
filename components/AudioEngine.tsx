"use client";

import { useEffect, useRef } from "react";
import { usePlayer } from "@/store/usePlayer";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const {
        playlist,
        index,
        isPlaying,
        volume,
        setProgress,
        next,
    } = usePlayer();

    useEffect(() => {
        if (!audioRef.current) return;
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause();
    }, [isPlaying, index]);

    useEffect(() => {
        if (audioRef.current)
            audioRef.current.volume = volume;
    }, [volume]);

    return (
        <audio
            ref={audioRef}
            src={playlist[index]?.src}
            onTimeUpdate={(e) => {
                const a = e.currentTarget;
                setProgress(
                    (a.currentTime / a.duration) * 100 || 0
                );
            }}
            onEnded={next}
        />
    );
}
