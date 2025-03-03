"use client";

import Image from "next/image";
import { usePlayerStore } from "~/store/use-player-store";
import { Music } from "~/types/music";
import { MusicDuration } from "./ui/music-duration";
import { HeartLine } from "./icons/heart-line";
import { DotsVertical } from "./icons/dots-vertical";
import { cn } from "~/lib/utils";
import { HeartFill } from "./icons/heart-fill";
import { useMusicStore } from "~/store/use-music-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export type MusicListItemProps = {
  music: Music;
  musicList: Music[];
  listNumber?: number;
};

export function MusicListItem({
  music,
  musicList,
  listNumber,
}: MusicListItemProps) {
  const [isAddToPlaylistDialogOpen, setIsAddToPlaylistDialogOpen] =
    useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  const { play, setPlaylist, currentTrack } = usePlayerStore();
  const {
    setPlayedAt,
    likeMusic,
    unlikeMusic,
    playlists,
    addToPlaylist,
    getPlaylist,
    removeFromPlaylist,
  } = useMusicStore();

  const { playlistId } = useParams();

  const playlist = getPlaylist(Number(playlistId));

  function handleMusicItemClick() {
    setPlaylist(musicList);
    play(music);
    setPlayedAt(music.id);
  }

  function handleLikeMusic(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    likeMusic(music.id);
    toast("Added to liked music.");
  }

  function handleUnlikeMusic(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    unlikeMusic(music.id);
    toast("Removed from liked music.");
  }

  function handleAddToPlaylist(event: React.FormEvent) {
    event.preventDefault();
    addToPlaylist(Number(selectedPlaylist), music.id);
    setIsAddToPlaylistDialogOpen(false);
    toast("Added music to playlist.");
  }

  function handleRemoveFromPlaylist() {
    if (playlist) {
      removeFromPlaylist(playlist.id, music.id);
    }
    toast("Removed music from playlist.");
  }

  return (
    <li
      key={music.id}
      onClick={handleMusicItemClick}
      className={cn(
        "flex items-center gap-4 w-full px-3 py-2 rounded-lg transition ease-in-out hover:bg-slate-900 cursor-default",
        music.id === currentTrack?.id && "bg-slate-900"
      )}
    >
      {listNumber && <span className="text-sm font-bold">{listNumber}</span>}
      <div className="shrink-0 relative bg-slate-800 rounded-md aspect-square h-12 overflow-hidden">
        <Image
          src={music.albumImageUrl}
          alt={music.title}
          className="object-cover"
          fill
        />
      </div>
      <div className="flex-1">
        <p className="text-base text-slate-200 line-clamp-1">{music.title}</p>
        <p className="text-sm text-slate-400 line-clamp-1">{music.artist}</p>
      </div>
      <div className="flex items-center gap-4">
        <MusicDuration audioUrl={music.audioUrl} />
        <button onClick={music.liked ? handleUnlikeMusic : handleLikeMusic}>
          {music.liked ? (
            <HeartFill className="text-lg text-red-500" />
          ) : (
            <HeartLine className="text-lg text-slate-400 transition ease-in-out hover:text-red-500" />
          )}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="outline-none">
            <button>
              <DotsVertical className="text-lg text-slate-400 hover:text-slate-200 ease-in-out transition" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent onClick={(event) => event.stopPropagation()}>
            {playlist?.id === playlistId ? (
              <DropdownMenuItem
                onClick={() => setIsAddToPlaylistDialogOpen(true)}
              >
                Add To Playlist
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={handleRemoveFromPlaylist}>
                Remove From Playlist
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog
        open={isAddToPlaylistDialogOpen}
        onOpenChange={setIsAddToPlaylistDialogOpen}
      >
        <DialogContent
          className="sm:max-w-[425px]"
          onClick={(event) => event.stopPropagation()}
        >
          <form onSubmit={handleAddToPlaylist} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Add To Playlist</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="playlist-name">Select Playlist</Label>
              <Select
                value={selectedPlaylist}
                onValueChange={setSelectedPlaylist}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Playlist" />
                </SelectTrigger>
                {playlists.length > 0 && (
                  <SelectContent>
                    {playlists.map((playlist) => {
                      return (
                        <SelectItem
                          key={playlist.id}
                          value={String(playlist.id)}
                        >
                          {playlist.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                )}
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit">Add Music</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </li>
  );
}
