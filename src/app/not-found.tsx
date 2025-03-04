"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-8 flex-col md:flex-row mt-24 md:mt-48">
      <div className="relative w-40 h-40">
        <Image
          src="/images/taken.svg"
          alt="404 Image"
          className="object-contain"
          fill
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl text-primary font-semibold">404</h1>
          <p className="text-lg text-slate-200">Not found</p>
        </div>
        <Button onClick={() => router.push("/")}>Back to home</Button>
      </div>
    </div>
  );
}
