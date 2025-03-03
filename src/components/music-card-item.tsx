"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";
import { useMusicStore } from "~/store/use-music-store";
import { usePlayerStore } from "~/store/use-player-store";
import { Music } from "~/types/music";

export type MusicCardItemProps = {
  music: Music;
  musicList: Music[];
};

export function MusicCardItem({ music, musicList }: MusicCardItemProps) {
  const { play, setPlaylist, currentTrack } = usePlayerStore();
  const { setPlayedAt } = useMusicStore();

  function handleMusicItemClick() {
    setPlaylist(musicList);
    play(music);
    setPlayedAt(music.id);
  }

  return (
    <li
      key={music.id}
      className={cn(
        "shrink-0 w-40 space-y-2 p-2 rounded-lg transition ease-in-out hover:bg-slate-900 cursor-default",
        music.id === currentTrack?.id && "bg-slate-900"
      )}
      onClick={handleMusicItemClick}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={music.albumImageUrl}
          alt={music.title}
          className="object-cover"
          fill
        />
      </div>
      <div>
        <p className="text-sm text-slate-200 line-clamp-1">{music.title}</p>
        <p className="text-sm text-slate-400">{music.artist}</p>
      </div>
    </li>
  );
}
