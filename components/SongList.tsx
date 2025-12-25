"use client";

import { songs } from "@/data/songs";
import { usePlayer } from "@/context/PlayerContext";

export default function SongList() {
    const { playSong } = usePlayer();

    return (
        <div className="space-y-3">
            {songs.map(song => (
                <div
                    key={song.id}
                    className="p-3 border rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => playSong(song)}
                >
                    🎵 {song.title} - {song.artist}
                </div>
            ))}
        </div>
    );
}
