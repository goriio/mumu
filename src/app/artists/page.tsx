"use client";

import { ArtistListItem } from "~/components/artist-list-item";
import { useMusicStore } from "~/store/use-music-store";

export default function Page() {
  const { getArtists } = useMusicStore();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">Artists</h2>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] items-start gap-1">
        {getArtists().map((artist) => {
          return <ArtistListItem key={artist.name} artist={artist} />;
        })}
      </ul>
    </section>
  );
}
