"use client";

import { usePlayerStore } from "../store/playerStore";
import AudioProgress from "./AudioProgress";

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
    if (!song) return null;

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
                    <button onClick={prev}>⏮</button>
                    <button className="play" onClick={togglePlay}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button onClick={next}>⏭</button>
                </div>

                <AudioProgress />
            </div>

            {/* RIGHT */}
            <div className="player-right">
                <a href={song.src} download>⬇</a>
            </div>
        </div>
    );
}
