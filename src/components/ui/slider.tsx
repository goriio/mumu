"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "~/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-slate-400">
      <SliderPrimitive.Range className="absolute h-full bg-slate-100" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-2 w-2 rounded-full border border-slate-100 bg-white transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-100 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
