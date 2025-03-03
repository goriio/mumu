"use client";

import { notFound, useParams } from "next/navigation";
import { MusicListItem } from "~/components/music-list-item";
import { useMusicStore } from "~/store/use-music-store";

export default function Page() {
  const { playlistId } = useParams();
  const { getPlaylist, getPlaylistMusic } = useMusicStore();

  const playlist = getPlaylist(Number(playlistId));

  const playlistMusic = getPlaylistMusic(Number(playlistId));

  if (!playlist) return notFound();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">{playlist.name}</h2>
      </div>
      <ul className="flex flex-col gap-1">
        {playlistMusic.length > 0 ? (
          playlistMusic.map((music) => {
            return (
              <MusicListItem
                key={music.id}
                music={music}
                musicList={playlistMusic}
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
