import { ReactNode } from "react";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "~/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: ClassNameValue;
  children?: ReactNode;
}) {
  return (
    <div className={cn("max-w-screen-2xl w-full mx-auto px-4 shadow", className)}>
      {children}
    </div>
  );
}
