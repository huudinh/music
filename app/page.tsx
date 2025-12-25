import SongList from "@/components/SongList";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="p-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">🎧 Music Player</h1>
      <SongList />
      <MusicPlayer />
    </main>
  );
}
