"use client";

import { PlayCircleFill } from "../icons/play-circle-fill";
import { PlaylistFill } from "../icons/playlist-fill";
import { User3Fill } from "../icons/user-3-fill";
import { HeartFill } from "../icons/heart-fill";
import { AddFill } from "../icons/add-fill";
import { Logo } from "./logo";
import { cn } from "~/lib/utils";
import { CloseFill } from "../icons/close-fill";
import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "./button";

import { usePathname, useRouter } from "next/navigation";
import { Search2Fill } from "../icons/search-2-fill";
import { AddPlaylistDialog } from "~/app/playlists/_components/add-playlist-dialog";
import { useMusicStore } from "~/store/use-music-store";
import { FileMusicFill } from "../icons/file-music-fill";

export function SideNav({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isAddPlaylistDialogOpen, setIsAddPlaylistDialogOpen] = useState(false);

  const { playlists } = useMusicStore();

  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="md:block md:absolute md:left-4">
      <header
        className={cn(
          "fixed left-0 md:left-auto px-4 py-4 md:py-8 w-full md:w-52 space-y-8 md:space-y-16 h-full border-r border-r-slate-800 bg-slate-950 -translate-x-full md:translate-x-0 z-10 transition ease-in-out",
          isOpen && "-translate-x-0"
        )}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsOpen(false)} className="block md:hidden">
            <CloseFill className="text-xl" />
          </button>
        </div>

        <ul className="space-y-4">
          <h2 className="text-xs uppercase text-slate-600">Discover</h2>
          {[
            {
              path: "/",
              label: "Browse",
              icon: <PlaylistFill className="text-lg" />,
            },
            {
              path: "/search",
              label: "Search",
              icon: <Search2Fill className="text-lg" />,
            },
            {
              path: "/recently-played",
              label: "Recently Played",
              icon: <PlayCircleFill className="text-lg" />,
            },
          ].map(({ path, label, icon }) => {
            return (
              <li
                key={path}
                onClick={() => {
                  router.push(path === "" ? "/" : path);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 text-base transition ease-in-out cursor-default",
                  "/" + pathname.split("/")[1] === path
                    ? "text-primary hover:text-primary/80"
                    : "text-slate-400 hover:text-slate-400/80"
                )}
              >
                {icon}
                {label}
              </li>
            );
          })}
        </ul>

        <ul className="space-y-4">
          <h2 className="text-xs uppercase text-slate-600">Library</h2>

          {[
            {
              path: "/songs",
              label: "Songs",
              icon: <FileMusicFill className="text-lg" />,
            },
            {
              path: "/playlists",
              label: "Playlists",
              icon: <PlaylistFill className="text-lg" />,
            },
            {
              path: "/artists",
              label: "Artists",
              icon: <User3Fill className="text-lg" />,
            },
            {
              path: "/liked",
              label: "Liked Music",
              icon: <HeartFill className="text-lg" />,
            },
          ].map(({ path, label, icon }) => {
            return (
              <li
                key={path}
                onClick={() => {
                  router.push(path === "" ? "/" : path);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2 text-base transition ease-in-out cursor-default",
                  "/" + pathname.split("/")[1] === path
                    ? "text-primary hover:text-primary/80"
                    : "text-slate-400 hover:text-slate-400/80"
                )}
              >
                {icon}
                {label}
              </li>
            );
          })}
        </ul>

        <ul className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase text-slate-600">My Music</h2>

            <Button
              onClick={() => setIsAddPlaylistDialogOpen(true)}
              variant="ghost"
              size="icon"
            >
              <AddFill className="text-base text-slate-400" />
            </Button>
            <AddPlaylistDialog
              open={isAddPlaylistDialogOpen}
              onOpenChange={setIsAddPlaylistDialogOpen}
            />
          </div>
          {playlists.map((playlist) => {
            return (
              <li
                key={playlist.id}
                onClick={() => {
                  router.push(`/playlists/${playlist.id}`);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-base text-slate-400 line-clamp-1 underline-offset-4 hover:underline cursor-pointer"
              >
                {playlist.name}
              </li>
            );
          })}
          {playlists.length === 0 && (
            <p className="text-sm text-slate-600">
              No playlist available. Create one.
            </p>
          )}
        </ul>
      </header>
    </div>
  );
}
