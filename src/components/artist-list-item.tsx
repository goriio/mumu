"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Artist } from "~/types/artist";

export type ArtistListItemProps = {
  artist: Artist;
};

export function ArtistListItem({ artist }: ArtistListItemProps) {
  const router = useRouter();

  return (
    <li
      key={artist.name}
      onClick={() => router.push(`/artists/${encodeURIComponent(artist.name)}`)}
      className="shrink-0 w-40 space-y-2 p-2 rounded-lg transition ease-in-out hover:bg-slate-900 cursor-default"
    >
      <div className="relative aspect-square rounded-full overflow-hidden">
        <Image
          src={artist.imageUrl}
          alt={artist.name}
          className="object-cover"
          fill
        />
      </div>
      <p className="text-sm text-slate-400">{artist.name}</p>
    </li>
  );
}
