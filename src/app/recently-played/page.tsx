"use client";

import { MusicListItem } from "~/components/music-list-item";
import { useMusicStore } from "~/store/use-music-store";

export default function Page() {
  const { getRecentlyPlayed } = useMusicStore();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">Recently Played</h2>
      </div>
      <ol className="flex flex-col gap-1">
        {getRecentlyPlayed().length > 0 ? (
          getRecentlyPlayed().map((music) => {
            return (
              <MusicListItem
                key={music.id}
                music={music}
                musicList={getRecentlyPlayed()}
              />
            );
          })
        ) : (
          <p>No recently played</p>
        )}
      </ol>
    </section>
  );
}
