"use client";

import Image from "next/image";
import { usePlayerStore } from "~/store/use-player-store";
import { Music } from "~/types/music";
import { Button } from "./ui/button";
import { PlayFill } from "./icons/play-fill";

export type HeroProps = {
  image: string;
  music: Music;
};

export function Hero({ image, music }: HeroProps) {
  const { play } = usePlayerStore();

  return (
    <div className="relative">
      <div className="relative w-full h-72 md:h-full rounded-lg overflow-hidden">
        <Image src={image} alt="Spirited Away" className="object-cover" fill />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-40% to-transparent"></div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 flex items-center justify-between px-4 pb-4 md:px-10 md:pb-8">
        <div>
          <p className="text-lg text-slate-100 font-bold">{music.title}</p>
          <p className="text-sm text-slate-200">{music.artist}</p>
        </div>
        <Button
          onClick={() => {
            play(music);
          }}
          size="icon"
          variant="secondary"
        >
          <PlayFill className="text-slate-200 text-lg" />
        </Button>
      </div>
    </div>
  );
}
