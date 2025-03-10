"use client";

import Image from "next/image";
import { SkipPreviousFill } from "../icons/skip-previous-fill";
import { PlayFill } from "../icons/play-fill";
import { SkipForwardFill } from "../icons/skip-forward-fill";
import { VolumeFill } from "../icons/volume-fill";
import { useRef, useState } from "react";
import { PauseFill } from "../icons/pause-fill";
import { formatDuration } from "~/lib/formats";
import { usePlayerStore } from "~/store/use-player-store";
import { Slider } from "./slider";
import { useMusicStore } from "~/store/use-music-store";
import { LikeButton } from "./like-button";
import { toast } from "sonner";

export function Player() {
  const { currentTrack, isPlaying, playlist, play, pause } = usePlayerStore();
  const { likeMusic, unlikeMusic, musicList } = useMusicStore();

  const currentMusic = currentTrack
    ? musicList.find((music) => music.id === currentTrack.id)
    : null;

  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  async function handlePlay() {
    audioRef.current?.play();
    if (currentTrack) play(currentTrack);
  }

  async function handlePause() {
    audioRef.current?.pause();
    pause();
  }

  function handleLikeMusic(event: React.MouseEvent) {
    event.stopPropagation();
    if (currentMusic) {
      likeMusic(currentMusic.id);
      toast("Added to liked music.");
    }
  }

  function handleUnlikeMusic(event: React.MouseEvent) {
    event.stopPropagation();
    if (currentMusic) {
      unlikeMusic(currentMusic.id);
      toast("Removed from liked music.");
    }
  }

  function handlePreviousTrack() {
    handlePause();
    const currentIndex = playlist?.findIndex(
      (track) => track.id === currentTrack?.id
    );

    const previousTrack =
      playlist?.at(currentIndex - 1) || playlist?.at(playlist.length - 1);
    if (previousTrack) play(previousTrack);
  }

  function handleNextTrack() {
    const currentIndex = playlist?.findIndex(
      (track) => track.id === currentTrack?.id
    );

    const nextTrack = playlist?.at(currentIndex + 1) || playlist?.at(0);
    if (nextTrack) play(nextTrack);
  }

  return (
    <>
      {currentTrack && (
        <section className="fixed bottom-0 md:bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-between gap-2 md:gap-12 md:max-w-fit w-full px-3 py-2 bg-slate-900 shadow-lg md:rounded-lg">
          <audio
            ref={audioRef}
            src={currentTrack.audioUrl}
            onTimeUpdate={() => setProgress(audioRef.current?.currentTime || 0)}
            onEnded={handleNextTrack}
            // onLoadStart={() => setIsLoading(true)}
            // onCanPlay={() => setIsLoading(false)}
            autoPlay
          ></audio>
          <div className="flex items-center gap-4">
            <div className="shrink-0 relative w-12 h-12 rounded-lg overflow-hidden">
              <Image
                src={currentTrack.albumImageUrl}
                alt="Album cover"
                className="object-cover"
                fill
              />
            </div>
            <div className="hidden sm:block max-w-44 w-full">
              <p className="text-sm text-slate-200 line-clamp-1">
                {currentTrack.title}
              </p>
              <p className="text-sm text-slate-400 line-clamp-1">
                {currentTrack.artist}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button onClick={handlePreviousTrack}>
                <SkipPreviousFill className="text-xl text-slate-200" />
              </button>
              {isPlaying ? (
                <PauseFill
                  onClick={() => handlePause()}
                  className="text-xl text-slate-200"
                />
              ) : (
                <PlayFill
                  onClick={() => handlePlay()}
                  className="text-xl text-slate-200"
                />
              )}
              <button onClick={handleNextTrack}>
                <SkipForwardFill className="text-xl text-slate-200" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <small className="text-xs text-slate-400 proportional-nums">
                {formatDuration(progress || 0)}
              </small>

              <Slider
                value={[progress]}
                max={audioRef.current?.duration}
                onValueChange={(value) => {
                  setProgress(value[0]);
                  if (audioRef.current) {
                    audioRef.current.currentTime = value[0];
                  }
                }}
                className="w-28 lg:w-96"
              />
              <small className="text-xs text-slate-400 proportional-nums">
                {formatDuration(audioRef.current?.duration || 0)}
              </small>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <VolumeFill className="text-sm text-slate-200" />

              <Slider
                value={[volume]}
                max={100}
                onValueChange={(value) => {
                  setVolume(value[0]);
                  if (audioRef.current) {
                    audioRef.current.volume = value[0] / 100;
                  }
                }}
                className="w-16"
              />
            </div>

            <LikeButton
              liked={currentMusic?.liked || false}
              onLike={handleLikeMusic}
              onUnlike={handleUnlikeMusic}
            />
          </div>
        </section>
      )}
    </>
  );
}
