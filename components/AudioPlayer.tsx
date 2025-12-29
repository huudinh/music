"use client";

import { usePlayer } from "@/store/usePlayer";

export default function AudioPlayer() {
    const {
        playlist,
        index,
        isPlaying,
        toggle,
        next,
        prev,
        volume,
        setVolume,
        progress,
    } = usePlayer();

    const song = playlist[index];
    if (!song) return null;

    return (
        <div className="player">
            <div className="player-left">
                <img
                    src={song.cover}
                    alt={song.title}
                    className="cover"
                />
                <div>
                    <div>{song.title}</div>
                    <div style={{ fontSize: 12, color: "#b3b3b3" }}>
                        {song.artist}
                    </div>
                </div>
            </div>

            <div className="player-center">
                <div className="controls">
                    <button onClick={prev}>⏮</button>
                    <button className="play" onClick={toggle}>
                        {isPlaying ? "⏸" : "▶"}
                    </button>
                    <button onClick={next}>⏭</button>
                </div>

                <div className="progress">
                    <div className="bar">
                        <div
                            className="bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="player-right">
                🔊
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) =>
                        setVolume(Number(e.target.value))
                    }
                />
            </div>
        </div>
    );
}
