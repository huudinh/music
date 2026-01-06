"use client";

import { useState } from "react";
import { albums, Album } from "../data/albums";
import { usePlayerStore } from "../store/playerStore";
import Playlist from "./Playlist";

export default function AlbumGrid() {
    const [album, setAlbum] = useState<Album | null>(null);
    const setPlaylist = usePlayerStore((s) => s.setPlaylist);

    const openAlbum = (a: Album) => {
        setPlaylist(a.songs); // ✅ chỉ gọi khi click
        setAlbum(a);
    };

    if (album) {
        return (
            <>
                <div className="album-header">
                    <button className="back-btn" onClick={() => setAlbum(null)}>← Albums</button>
                </div>
                <Playlist />
            </>
        );
    }

    return (
        <div className="album-grid">
            {albums.map((a) => (
                <div key={a.id} className="album-card" onClick={() => openAlbum(a)}>
                    <img src={a.cover} />
                    <div>{a.title}</div>
                    <small>{a.artist}</small>
                </div>
            ))}
        </div>
    );
}
