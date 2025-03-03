"use client";

import { MusicListItem } from "~/components/music-list-item";
import { useMusicStore } from "~/store/use-music-store";

export default function Page() {
  const { getLikedMusic } = useMusicStore();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">Liked Music</h2>
      </div>
      <ol className="flex flex-col gap-1">
        {getLikedMusic().length > 0 ? (
          getLikedMusic().map((music) => {
            return (
              <MusicListItem
                key={music.id}
                music={music}
                musicList={getLikedMusic()}
              />
            );
          })
        ) : (
          <p className="text-base text-slate-600">No liked music</p>
        )}
      </ol>
    </section>
  );
}
