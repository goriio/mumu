"use client";

import { ClassNameValue } from "tailwind-merge";
import { Music2AiFill } from "../icons/music-2-ai-fill";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

export function Logo({ className }: { className?: ClassNameValue }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className={cn("flex items-center gap-1 text-2xl font-bold cursor-pointer", className)}
    >
      <Music2AiFill className="text-primary text-2xl" />
      mumu
    </div>
  );
}
