"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DotsVertical } from "~/components/icons/dots-vertical";
import { Button } from "~/components/ui/button";
import { useMusicStore } from "~/store/use-music-store";
import { AddPlaylistDialog } from "./_components/add-playlist-dialog";

export default function Page() {
  const [isAddPlaylistDialogOpen, setIsAddPlaylistDialogOpen] = useState(false);

  const { playlists, getPlaylistMusic } = useMusicStore();
  const router = useRouter();

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold">Playlists</h2>
        <Button onClick={() => setIsAddPlaylistDialogOpen(true)}>
          Add Playlist
        </Button>
        <AddPlaylistDialog
          open={isAddPlaylistDialogOpen}
          onOpenChange={setIsAddPlaylistDialogOpen}
        />
      </div>
      <ol className="flex flex-col gap-1">
        {playlists.length > 0 ? (
          playlists.map((playlist) => {
            const playlistCover = getPlaylistMusic(playlist.id).at(
              0
            )?.albumImageUrl;

            return (
              <li
                key={playlist.id}
                onClick={() => {
                  router.push(`/playlists/${playlist.id}`);
                }}
                className="flex items-center gap-4 w-full px-3 py-2 rounded-lg transition ease-in-out hover:bg-slate-900 cursor-default"
              >
                <div className="shrink-0 relative bg-slate-800 rounded-md aspect-square h-12 overflow-hidden">
                  {playlistCover && (
                    <Image
                      src={playlistCover}
                      alt={playlist.name}
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <p className="flex-1 text-base text-slate-200 line-clamp-1">
                  {playlist.name}
                </p>
                <DotsVertical className="text-lg text-slate-400" />
              </li>
            );
          })
        ) : (
          <p className="text-base text-slate-600">
            No playlist available. Create one.
          </p>
        )}
      </ol>
    </section>
  );
}
