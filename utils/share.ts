export async function shareContent({
    title,
    text,
    url,
}: {
    title: string;
    text?: string;
    url?: string;
}) {
    let shareUrl = window.location.href;

    if (url) {
        // ================= NORMALIZE URL =================
        if (url.startsWith("#")) {
            // Giữ nguyên path + query, chỉ đổi hash
            const { origin, pathname, search } = window.location;
            shareUrl = `${origin}${pathname}${search}${url}`;
        }
        else if (url.startsWith("/")) {
            shareUrl = window.location.origin + url;
        }
        else if (url.startsWith("http")) {
            shareUrl = url;
        }
    }

    // ================= MOBILE SHARE =================
    if (navigator.share) {
        try {
            await navigator.share({
                title,
                text,
                url: shareUrl,
            });
            return;
        } catch (err) {
            console.warn("Share cancelled or failed:", err);
        }
    }

    // ================= CLIPBOARD FALLBACK =================
    try {
        await navigator.clipboard.writeText(shareUrl);
        alert("🔗 Đã copy link để chia sẻ");
        return;
    } catch (err) {
        console.warn("Clipboard failed:", err);
    }

    // ================= LAST FALLBACK =================
    window.prompt("Copy link để chia sẻ:", shareUrl);
}
