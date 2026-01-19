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

// ================= FETCH (NO CACHE) =================
const fetchAlbums = async (): Promise<Album[]> => {
    const res = await fetch(
        "https://huudinh.io.vn/wp-json/album-manager/v1/albums",
        {
            cache: "no-store", // ❗ BẮT BUỘC realtime
        }
    );

    if (!res.ok) {
        throw new Error("Không thể tải danh sách album");
    }

    return res.json();
};

// ================= COMPONENT =================
export default function AlbumGrid() {
    const [albumSlug, setAlbumSlug] = useState<string | null>(null);
    const setPlaylist = usePlayerStore((s) => s.setPlaylist);

    // ===== REALTIME QUERY =====
    const {
        data: albums = [],
        isLoading,
        isError,
        error,
    } = useQuery<Album[], Error>({
        queryKey: ["albums"],
        queryFn: fetchAlbums,

        // 🔥 REALTIME
        refetchInterval: 15_000, // 15s
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    // ===== HASH → SLUG =====
    useEffect(() => {
        const syncFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (!hash) {
                setAlbumSlug(null);
                return;
            }

            setAlbumSlug(hash.split("/")[0]);
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);

        return () => {
            window.removeEventListener("hashchange", syncFromHash);
        };
    }, []);

    // ===== SLUG → ALBUM =====
    const selectedAlbum =
        albumSlug &&
        albums.find((a) => slugify(a.title) === albumSlug);

    // ===== SYNC PLAYLIST =====
    useEffect(() => {
        if (selectedAlbum) {
            setPlaylist(selectedAlbum.songs);
        }
    }, [selectedAlbum, setPlaylist]);

    // ================= ACTIONS =================
    const openAlbum = (album: Album) => {
        const slug = slugify(album.title);
        window.location.hash = slug;
    };

    const closeAlbum = () => {
        window.location.hash = "";
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
