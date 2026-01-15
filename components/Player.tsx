"use client";

import { useEffect } from "react";
import { usePlayerStore } from "../store/playerStore";
import AudioProgress from "./AudioProgress";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Share2,
    Download,
} from "lucide-react";
import { shareContent } from "../utils/share";


// ================= HELPERS =================
const slugify = (str: string) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

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

    // ================= UPDATE TAB TITLE =================
    useEffect(() => {
        if (song) {
            const status = isPlaying ? "▶" : "⏸";
            document.title = `${status} ${song.title} - ${song.artist} | Nhạc của Định`;
        } else {
            document.title = "Nhạc của Định";
        }
    }, [song, isPlaying]);

    if (!song) return null;

    // ================= SHARE SONG =================
    const shareSong = () => {
        const songSlug = slugify(song.title);

        // lấy album slug hiện tại từ hash
        const hash = window.location.hash.replace("#", "");
        const albumSlug = hash.split("/")[0] || "nhac-song";

        shareContent({
            title: song.title,
            text: `🎵 ${song.title} – ${song.artist}`,
            url: `#${albumSlug}/${songSlug}`,
        });
    };

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

                    <button
                        className="play"
                        onClick={togglePlay}
                        aria-label="Play / Pause"
                    >
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
                <button onClick={shareSong} aria-label="Share song">
                    <Share2 size={18} />
                </button>

                <a href={song.src} download>
                    <Download size={16} /> Tải nhạc
                </a>
            </div>
        </div>
    );
}
