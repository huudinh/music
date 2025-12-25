import "./globals.css";
import { PlayerProvider } from "@/context/PlayerContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </body>
    </html>
  );
}
