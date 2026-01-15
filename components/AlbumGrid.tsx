"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import Playlist from "./Playlist";
import { Share2 } from "lucide-react";
import { shareContent } from "../utils/share";


// ================= TYPES =================
export interface Song {
    id: number;
    title: string;
    artist: string;
    src: string;
    cover: string;
}

export interface Album {
    id: number;
    title: string;
    artist: string;
    cover: string;
    songs: Song[];
}

// ================= HELPERS =================
const slugify = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

// ================= FETCH =================
const fetchAlbums = async (): Promise<Album[]> => {
    const response = await fetch(
        "https://huudinh.io.vn/wp-json/album-manager/v1/albums"
    );

    if (!response.ok) {
        throw new Error("Không thể tải danh sách album");
    }

    return response.json();
};

// ================= COMPONENT =================
export default function AlbumGrid() {
    const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
    const setPlaylist = usePlayerStore((s) => s.setPlaylist);

    const {
        data: albums = [],
        isLoading,
        isError,
        error,
    } = useQuery<Album[], Error>({
        queryKey: ["albums"],
        queryFn: fetchAlbums,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 30,
    });

    // ================= HASH → ALBUM =================
    useEffect(() => {
        if (!albums.length) return;

        const hash = window.location.hash.replace("#", "");
        if (!hash) return;

        // ✅ CHỈ LẤY ALBUM SLUG (TRƯỚC /)
        const albumSlug = hash.split("/")[0];

        const found = albums.find(
            (a) => slugify(a.title) === albumSlug
        );

        if (found) {
            setSelectedAlbum(found);
            setPlaylist(found.songs);
        }
    }, [albums, setPlaylist]);

    // ================= ACTIONS =================
    const openAlbum = (album: Album) => {
        const slug = slugify(album.title);
        window.location.hash = slug;

        setSelectedAlbum(album);
        setPlaylist(album.songs);
    };

    const closeAlbum = () => {
        window.location.hash = "";
        setSelectedAlbum(null);
    };

    const shareAlbum = (album: Album) => {
        const slug = slugify(album.title);

        shareContent({
            title: album.title,
            text: `📀 Album ${album.title} – ${album.artist}`,
            url: `${window.location.origin}/#${slug}`,
        });
    };

    // ================= RENDER =================
    if (isLoading) {
        return <div className="text-center py-10">Đang tải album...</div>;
    }

    if (isError) {
        return (
            <div className="text-center py-10 text-red-500">
                Lỗi tải dữ liệu: {error?.message || "Không xác định"}
            </div>
        );
    }

    // ===== ALBUM DETAIL =====
    if (selectedAlbum) {
        return (
            <>
                <div className="album-header">
                    <button className="back-btn" onClick={closeAlbum}>
                        Albums
                    </button>

                    <div className="album-info">
                        <img
                            src={selectedAlbum.cover}
                            alt={selectedAlbum.title}
                        />
                        <div>
                            <h2>{selectedAlbum.title}</h2>
                            <p>{selectedAlbum.artist}</p>
                        </div>
                    </div>

                    <button
                        className="album-share"
                        onClick={() => shareAlbum(selectedAlbum)}
                        aria-label="Share album"
                    >
                        <Share2 size={18} />
                    </button>
                </div>

                <Playlist />
            </>
        );
    }

    // ===== EMPTY =====
    if (albums.length === 0) {
        return <div className="text-center py-10">Không có album nào</div>;
    }

    // ===== GRID =====
    return (
        <div className="album-grid">
            {albums.map((a) => (
                <div
                    key={a.id}
                    className="album-card"
                    onClick={() => openAlbum(a)}
                >
                    <div className="album-cover">
                        <img src={a.cover} alt={a.title} />
                        <div className="album-play-button">▶</div>
                    </div>

                    <div className="album-info-card">
                        <div className="album-title">{a.title}</div>
                        <div className="album-artist">{a.artist}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
