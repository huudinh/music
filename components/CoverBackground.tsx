"use client";

import { usePlayer } from "@/store/usePlayer";

export default function CoverBackground() {
    const { playlist, index } = usePlayer();
    const song = playlist[index];

    if (!song) return null;

    return (
        <div
            className="cover-bg"
            style={{
                backgroundImage: `url(${song.cover})`,
            }}
        />
    );
}
