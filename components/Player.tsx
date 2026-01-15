// components/Player.tsx
"use client";

import { useEffect } from "react"; // ← Thêm import này nếu chưa có
import { usePlayerStore } from "../store/playerStore";
import AudioProgress from "./AudioProgress";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
} from "lucide-react";

export default function Player() {
    const {
        playlist,
        currentIndex,
        isPlaying,
        togglePlay,
        next,
        prev,
    } = usePlayerStore();

    const song = playlist[currentIndex];

    // ← THÊM ĐOẠN NÀY: Cập nhật title tab browser
    useEffect(() => {
        if (song) {
            const status = isPlaying ? "▶" : "⏸";
            document.title = `${status} ${song.title} - ${song.artist} | Nhạc của Định`;
        } else {
            document.title = "Nhạc của Định"; // Title mặc định khi không phát nhạc
        }
    }, [song, isPlaying]); // Chạy lại khi đổi bài hoặc play/pause

    if (!song) return null; // Giữ nguyên để ẩn player nếu chưa chọn bài

    return (
        <div className="player">
            {/* LEFT */}
            <div className="player-left">
                <img src={song.cover} />
                <div className="meta">
                    <div className="title">{song.title}</div>
                    <div className="artist">{song.artist}</div>
                </div>
            </div>
            {/* CENTER */}
            <div className="player-center">

                <div className="controls">
                    <button onClick={prev} aria-label="Previous">
                        <SkipBack size={22} />
                    </button>

                    <button className="play" onClick={togglePlay} aria-label="Play / Pause">
                        {isPlaying ? <Pause size={26} /> : <Play size={26} />}
                    </button>

                    <button onClick={next} aria-label="Next">
                        <SkipForward size={22} />
                    </button>
                </div>
                <AudioProgress />
            </div>
            {/* RIGHT */}
            <div className="player-right">
                <a href={song.src} download>Tải nhạc (^_^)!</a>
            </div>
        </div>
    );
}

