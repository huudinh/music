"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

// ================= HELPERS =================
const slugify = (str: string) =>
    str
        .toLowerCase()
        .replace(/đ/g, "d")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export default function Playlist() {
    const { playlist, currentIndex, setSong } = usePlayerStore();
    const activeRef = useRef<HTMLDivElement | null>(null);

    // ================= SYNC SONG FROM HASH (F5) =================
    useEffect(() => {
        if (!playlist.length) return;

        const hash = window.location.hash.replace("#", "");
        const [, songSlug] = hash.split("/");

        if (!songSlug) return;

        const index = playlist.findIndex(
            (s) => slugify(s.title) === songSlug
        );

        if (index !== -1 && index !== currentIndex) {
            setSong(index);
        }
    }, [playlist]);

    // ================= SCROLL ACTIVE SONG =================
    useEffect(() => {
        activeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [currentIndex]);

    // ================= CLICK SONG =================
    const handleSelectSong = (index: number) => {
        const song = playlist[index];
        if (!song) return;

        const hash = window.location.hash.replace("#", "");
        const albumSlug = hash.split("/")[0] || "nhac-song";

        window.location.hash = `${albumSlug}/${slugify(song.title)}`;
        setSong(index);
    };

    return (
        <div className="playlist">
            {playlist.map((s, i) => (
                <div
                    key={s.id}
                    ref={i === currentIndex ? activeRef : null}
                    className={`item ${i === currentIndex ? "active" : ""}`}
                    onClick={() => handleSelectSong(i)}
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
