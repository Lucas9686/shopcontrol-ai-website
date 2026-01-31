import Image from "next/image";

interface ScreenshotFigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function ScreenshotFigure({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
}: ScreenshotFigureProps) {
  return (
    <figure className="overflow-hidden rounded-lg border border-border">
      <Image src={src} alt={alt} width={width} height={height} className="w-full" />
      {caption && (
        <figcaption className="bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
