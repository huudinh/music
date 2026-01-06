"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const { playlist, currentIndex, isPlaying } = usePlayerStore();

    useEffect(() => {
        if (!audioRef.current) return;
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = playlist[currentIndex]?.src || "";
            audioRef.current.play();
        }
    }, [currentIndex]);

    return <audio ref={audioRef} />;
}
