"use client";

import { notFound, useParams } from "next/navigation";
import { MusicListItem } from "~/components/music-list-item";
import { useMusicStore } from "~/store/use-music-store";

export default function Page() {
  const { name } = useParams();
  const { getArtist, getArtistsMusic } = useMusicStore();

  const artistName = decodeURIComponent(String(name));

  const artist = getArtist(artistName);

  const artistMusic = getArtistsMusic(artistName);

  if (!artist) return notFound();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">{artist.name}</h2>
      </div>
      <ul className="flex flex-col gap-1">
        {artistMusic.length > 0 ? (
          artistMusic.map((music) => {
            return (
              <MusicListItem
                key={music.id}
                music={music}
                musicList={artistMusic}
              />
            );
          })
        ) : (
          <p className="text-base text-slate-600">No music in playlist</p>
        )}
      </ul>
    </section>
  );
}
