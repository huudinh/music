"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export default function Playlist() {
    const { playlist, currentIndex, setSong } = usePlayerStore();
    const activeRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        activeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [currentIndex]);

    return (
        <div className="playlist">
            {playlist.map((s, i) => (
                <div
                    key={s.id}
                    ref={i === currentIndex ? activeRef : null}
                    className={`item ${i === currentIndex ? "active" : ""}`}
                    onClick={() => setSong(i)}
                >
                    <img src={s.cover} alt={s.title} />
                    <div>
                        <div className="title">{s.title}</div>
                        <small className="artist">{s.artist}</small>
                    </div>
                </div>
            ))}
        </div>
    );
}
