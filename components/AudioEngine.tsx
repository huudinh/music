// components/AudioEngine.tsx
"use client";

import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/playerStore";

export default function AudioEngine() {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Lấy dữ liệu từ store
    const { playlist, currentIndex, isPlaying, next } = usePlayerStore();

    // Lấy bài hát hiện tại (an toàn hơn)
    const currentSong = playlist[currentIndex];

    // 1. Phát / tạm dừng theo trạng thái isPlaying
    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current
                .play()
                .catch((e) => console.warn("Play bị chặn (có thể do chưa interact):", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // 2. Cập nhật src khi chuyển bài + tự động play nếu đang ở trạng thái phát
    // useEffect(() => {
    //     if (!audioRef.current || !currentSong) return;

    //     audioRef.current.src = currentSong.src;

    //     // Chỉ tự động play khi người dùng đang ở trạng thái phát (tránh play tự động khi mới load trang)
    //     if (isPlaying) {
    //         audioRef.current
    //             .play()
    //             .catch((e) => console.warn("Auto play failed:", e));
    //     }
    // }, [currentIndex, currentSong, isPlaying]);

    useEffect(() => {
        if (!audioRef.current || !currentSong) return;

        const audio = audioRef.current;

        audio.src = currentSong.src;
        audio.currentTime = 0; // reset khi đổi bài (đúng)

        // chỉ auto play khi đang ở trạng thái phát
        if (isPlaying) {
            audio
                .play()
                .catch(e => console.warn("Auto play failed:", e));
        }
    }, [currentIndex]); // ✅ CHỈ KHI ĐỔI BÀI


    // 3. TỰ ĐỘNG CHUYỂN BÀI TIẾP THEO KHI BÀI HIỆN TẠI KẾT THÚC
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            next(); // Gọi hàm next từ store → chuyển bài và tự động play bài kế
        };

        audio.addEventListener("ended", handleEnded);

        // Cleanup listener khi component unmount
        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [next]);

    return (
        <audio
            ref={audioRef}
            preload="metadata" // Load metadata nhanh để progress bar chính xác, nhưng không load full file ngay
        />
    );
}