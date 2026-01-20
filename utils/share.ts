import toast from "react-hot-toast";

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
        if (url.startsWith("#")) {
            const { origin, pathname, search } = window.location;
            shareUrl = `${origin}${pathname}${search}${url}`;
        } else if (url.startsWith("/")) {
            shareUrl = window.location.origin + url;
        } else if (url.startsWith("http")) {
            shareUrl = url;
        }
    }

    // ================= MOBILE SHARE =================
    if (navigator.share) {
        try {
            await navigator.share({ title, text, url: shareUrl });
            toast.success("✅ Đã chia sẻ thành công!");
            return;
        } catch (err) {
            toast.error("❌ Chia sẻ bị hủy hoặc lỗi");
            console.warn("Share cancelled or failed:", err);
        }
    }

    // ================= CLIPBOARD FALLBACK =================
    try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success("🔗 Link đã được copy vào clipboard");
        return;
    } catch (err) {
        toast.error("❌ Không thể copy link");
        console.warn("Clipboard failed:", err);
    }

    // ================= LAST FALLBACK =================
    toast("📋 Copy thủ công: " + shareUrl, { duration: 5000 });
}
