"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ZoomableImage({
  src,
  alt,
  width = 1200,
  height = 675,
  className = "w-full",
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} cursor-zoom-in`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={handleClose}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-auto">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-w-none"
              quality={100}
            />
          </div>
        </div>
      )}
    </>
  );
}
