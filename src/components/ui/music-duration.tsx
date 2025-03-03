"use client";

import { useState } from "react";
import { formatDuration } from "~/lib/formats";

export function MusicDuration({ audioUrl }: { audioUrl: string }) {
  const [duration, setDuration] = useState<number | null>(null);

  return (
    <>
      <audio
        src={audioUrl}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        preload="metadata"
      />
      <span className="text-sm text-slate-400">
        {" "}
        {duration ? formatDuration(duration) : "--:--"}
      </span>
    </>
  );
}
