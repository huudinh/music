"use client";

import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime";

export default function AudioProgress() {
    const audio = document.querySelector("audio") as HTMLAudioElement;

    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (!audio) return;

        const update = () => setTime(audio.currentTime);
        const meta = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", meta);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", meta);
        };
    }, [audio]);

    return (
        <div className="progress">
            <span>{formatTime(time)}</span>

            <div
                className="bar"
                onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    audio.currentTime =
                        ((e.clientX - rect.left) / rect.width) * duration;
                }}
            >
                <div
                    className="fill"
                    style={{ width: `${(time / duration) * 100 || 0}%` }}
                />
            </div>

            <span>{formatTime(duration)}</span>
        </div>
    );
}
