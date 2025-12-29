import "./globals.css";
import AudioEngine from "@/components/AudioEngine";
import AudioPlayer from "@/components/AudioPlayer";
import CoverBackground from "@/components/CoverBackground";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <CoverBackground />
        {children}
        <AudioEngine />
        <AudioPlayer />
      </body>
    </html>
  );
}
