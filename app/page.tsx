// app/page.tsx
"use client";

import AlbumGrid from "../components/AlbumGrid";
import Player from "../components/Player";
import AudioEngine from "../components/AudioEngine";

export default function Page() {
  return (
    <>
      <AlbumGrid />
      <Player />
      <AudioEngine />
    </>
  );
}
