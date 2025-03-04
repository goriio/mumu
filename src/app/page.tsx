"use client";

import { useRouter } from "next/navigation";
import { Hero } from "~/components/hero";
import { PlayFill } from "~/components/icons/play-fill";
import { Shuffle2Fill } from "~/components/icons/shuffle-2-fill";
import { MusicCardItem } from "~/components/music-card-item";
import { MusicListItem } from "~/components/music-list-item";
import { Button } from "~/components/ui/button";
import { useMusicStore } from "~/store/use-music-store";
import { usePlayerStore } from "~/store/use-player-store";

export default function Home() {
  const { play, setPlaylist } = usePlayerStore();
  const { musicList } = useMusicStore();
  const router = useRouter();

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">New Releases</h2>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                setPlaylist(musicList);
                play(musicList[0]);
              }}
              size="icon"
              variant="secondary"
            >
              <Shuffle2Fill className="text-slate-200 text-lg" />
            </Button>
            <Button
              onClick={() => {
                setPlaylist(musicList);
                play(musicList[0]);
              }}
              size="icon"
            >
              <PlayFill className="text-slate-200 text-lg" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Hero
            image="https://wallpaperaccess.com/full/400693.jpg"
            music={musicList[5]}
          />

          <ul className="flex flex-col gap-1">
            {musicList.slice(0, 6).map((music) => {
              return (
                <MusicListItem
                  key={music.id}
                  music={music}
                  musicList={musicList}
                />
              );
            })}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">Recommended Song Sheets</h2>
          <Button onClick={() => router.push("/songs")} variant="link">
            Show All
          </Button>
        </div>
        <ul className="flex items-start gap-1 overflow-x-auto">
          {musicList.map((music) => {
            return (
              <MusicCardItem
                key={music.id}
                music={music}
                musicList={musicList}
              />
            );
          })}
        </ul>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold">This Week: Most Trending Music</h2>
        </div>
        <ol className="flex flex-col gap-1">
          {musicList.slice(0, 10).map((music, index) => {
            return (
              <MusicListItem
                key={music.id}
                listNumber={index + 1}
                music={music}
                musicList={musicList}
              />
            );
          })}
        </ol>
      </section>
    </div>
  );
}
