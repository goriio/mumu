"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useMusicStore } from "~/store/use-music-store";

export function AddPlaylistDialog({ open, onOpenChange }: DialogProps) {
  const [playlistError, setPlaylistError] = useState("");
  const [playlistName, setPlaylistName] = useState("");

  const { createPlaylist } = useMusicStore();

  function handleAddPlaylist(event: FormEvent) {
    event.preventDefault();

    if (!playlistName) {
      setPlaylistError("Name is required");
      return;
    }

    createPlaylist(playlistName);
    setPlaylistName("");
    setPlaylistError("");
    onOpenChange?.(false);

    toast("Playlist added.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAddPlaylist} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Add Playlist</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor="playlist-name">Name</Label>
            <Input
              id="playlist-name"
              value={playlistName}
              onChange={(event) => setPlaylistName(event.target.value)}
            />
            <span className="text-xs text-red-500">{playlistError}</span>
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
