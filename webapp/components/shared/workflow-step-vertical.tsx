"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomableImage } from "@/components/shared/zoomable-image";

interface WorkflowStepVerticalProps {
  number: number;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  isLast?: boolean;
  isFirst?: boolean;
}

export function WorkflowStepVertical({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  isLast = false,
  isFirst = false,
}: WorkflowStepVerticalProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const circleEl = circleRef.current;
    const lineEl = lineRef.current;
    if (!circleEl) return;

    const handleScroll = () => {
      const viewportH = window.innerHeight;
      const trigger = viewportH * 0.6;

      // Circle activates when its top reaches 60% of viewport
      // For first step, just check visibility; for others, the line from
      // the previous step reaching this circle triggers it
      const circleRect = circleEl.getBoundingClientRect();
      const circleCenter = circleRect.top + circleRect.height / 2;

      if (isFirst) {
        setIsActive(circleCenter < trigger);
      } else {
        // Activate when circle center passes the trigger line
        setIsActive(circleCenter < trigger);
      }

      // Line progress
      if (!lineEl || isLast) return;
      const rect = lineEl.getBoundingClientRect();
      const lineTop = rect.top;
      const lineHeight = rect.height;

      if (lineTop > trigger || lineHeight === 0) {
        setLineProgress(0);
      } else {
        const progress = Math.min(1, Math.max(0, (trigger - lineTop) / lineHeight));
        setLineProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLast, isFirst]);

  return (
    <div ref={stepRef}>
      <div className="group relative flex gap-6 rounded-lg p-2 -m-2 transition-colors hover:bg-card/50">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          {/* Number circle */}
          <span
            ref={circleRef}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold transition-all duration-500 ${
              isActive
                ? "bg-[#1456c8] text-white scale-110 shadow-[0_0_18px_rgba(20,86,200,0.55),0_0_36px_rgba(20,86,200,0.25)]"
                : "bg-muted text-muted-foreground scale-100"
            }`}
          >
            {number}
          </span>

          {/* Progress line */}
          {!isLast && (
            <div ref={lineRef} className="relative mt-2 w-px flex-1 bg-border">
              <div
                className="absolute inset-x-0 top-0 w-full bg-[#1456c8] shadow-[0_0_6px_rgba(20,86,200,0.45)] transition-none"
                style={{ height: `${lineProgress * 100}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className={`pb-8 transition-all duration-700 ${
            isActive
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {description}
          </p>
          {imageSrc && (
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <ZoomableImage
                src={imageSrc}
                alt={imageAlt ?? title}
                width={1200}
                height={675}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
