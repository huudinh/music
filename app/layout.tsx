// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers"; // Đường dẫn đến file providers.tsx trên
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Nhạc của Định",
  description: "Ứng dụng nghe nhạc PWA cá nhân",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nhạc của Định",
  },
  // Các meta khác cho PWA (Next.js sẽ tự generate link manifest nếu có file manifest.ts)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Apple touch icon (Next.js tự generate nếu có file icons, nhưng giữ thủ công nếu cần) */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}