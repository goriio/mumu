"use client";

import { MusicListItem } from "~/components/music-list-item";
import { useMusicStore } from "~/store/use-music-store";

export default function Page() {
  const { musicList } = useMusicStore();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">Songs</h2>
      </div>
      <ul className="flex flex-col gap-1">
        {musicList.length > 0 ? (
          musicList.map((music) => {
            return (
              <MusicListItem
                key={music.id}
                music={music}
                musicList={musicList}
              />
            );
          })
        ) : (
          <p className="text-base text-slate-600">No liked music</p>
        )}
      </ul>
    </section>
  );
}
