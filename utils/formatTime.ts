export function formatTime(time: number) {
    if (!time) return "00:00";

    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = Math.floor(time % 60);

    if (h > 0) {
        // Có giờ → hiển thị hh:mm:ss
        return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    } else {
        // Không có giờ → hiển thị mm:ss
        return `${m}:${s.toString().padStart(2, "0")}`;
    }
}
