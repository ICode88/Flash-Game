"use client";

import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface LogoProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  hideText?: boolean;
}

export default function Logo({
  className,
  textClassName,
  iconClassName,
  hideText = false,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        <Zap
          className={cn(
            "h-8 w-8 text-orange-500 drop-shadow-md",
            iconClassName
          )}
          strokeWidth={2.5}
        />
      </div>
      {!hideText && (
        <div className={cn("font-bold tracking-tight text-xl", textClassName)}>
          <span className="text-purple-500">Flash</span>
          <span className="text-orange-500">Games</span>
        </div>
      )}
    </div>
  );
}