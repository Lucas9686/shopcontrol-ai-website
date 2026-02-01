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
}

export function WorkflowStepVertical({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  isLast = false,
}: WorkflowStepVerticalProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const stepEl = stepRef.current;
    const lineEl = lineRef.current;
    if (!stepEl) return;

    // Intersection observer to detect when step enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(stepEl);

    // Scroll handler for line fill progress
    const handleScroll = () => {
      if (!lineEl || isLast) return;
      const rect = lineEl.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Line starts filling when its top reaches 60% of viewport
      const startTrigger = viewportH * 0.6;
      const lineTop = rect.top;
      const lineHeight = rect.height;

      if (lineTop > startTrigger || lineHeight === 0) {
        setLineProgress(0);
      } else {
        const progress = Math.min(1, Math.max(0, (startTrigger - lineTop) / lineHeight));
        setLineProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLast]);

  return (
    <div ref={stepRef}>
      <div className="group relative flex gap-6 rounded-lg p-2 -m-2 transition-colors hover:bg-card/50">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          {/* Number circle */}
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold transition-all duration-700 ${
              isActive
                ? "bg-[#1a6fff] text-white scale-110 shadow-[0_0_20px_rgba(26,111,255,0.6),0_0_40px_rgba(26,111,255,0.3)]"
                : "bg-muted text-muted-foreground scale-100"
            }`}
          >
            {number}
          </span>

          {/* Progress line */}
          {!isLast && (
            <div ref={lineRef} className="relative mt-2 w-px flex-1 bg-border">
              <div
                className="absolute inset-x-0 top-0 w-full bg-[#1a6fff] shadow-[0_0_8px_rgba(26,111,255,0.5)] transition-none"
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
