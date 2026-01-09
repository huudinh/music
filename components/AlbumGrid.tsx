"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usePlayerStore } from "../store/playerStore";
import Playlist from "./Playlist";

// Định nghĩa interface
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

// Hàm fetch albums từ API
const fetchAlbums = async (): Promise<Album[]> => {
    const response = await fetch("https://huudinh.io.vn/wp-json/album-manager/v1/albums", {
        // Cache revalidate 10 phút (Next.js fetch cache)
        next: { revalidate: 600 },
    });

    if (!response.ok) {
        throw new Error("Không thể tải danh sách album");
    }

    return response.json();
};

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
        staleTime: 1000 * 60 * 10, // Dữ liệu còn "tươi" trong 10 phút
        gcTime: 1000 * 60 * 30,    // ← ĐÃ SỬA: cacheTime → gcTime (30 phút trước khi bị garbage collected)
    });

    const openAlbum = (album: Album) => {
        setPlaylist(album.songs);
        setSelectedAlbum(album);
    };

    const closeAlbum = () => {
        setSelectedAlbum(null);
    };

    // Xem chi tiết album
    if (selectedAlbum) {
        return (
            <>
                <div className="album-header">
                    <button className="back-btn" onClick={closeAlbum}>
                        Albums
                    </button>
                    <div className="album-info">
                        <img src={selectedAlbum.cover} alt={selectedAlbum.title} />
                        <div>
                            <h2>{selectedAlbum.title}</h2>
                            <p>{selectedAlbum.artist}</p>
                        </div>
                    </div>
                </div>
                <Playlist />
            </>
        );
    }

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

    if (albums.length === 0) {
        return <div className="text-center py-10">Không có album nào</div>;
    }

    return (
        <div className="album-grid">
            {albums.map((a) => (
                // <div key={a.id} className="album-card" onClick={() => openAlbum(a)}>
                //     <img src={a.cover} alt={a.title} />
                //     <div className="album-title">{a.title}</div>
                //     <small className="album-artist">{a.artist}</small>
                // </div>
                <div key={a.id} className="album-card" onClick={() => openAlbum(a)}>
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