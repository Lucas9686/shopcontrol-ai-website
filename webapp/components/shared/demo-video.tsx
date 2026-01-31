"use client";

interface DemoVideoProps {
  videoId: string;
  title?: string;
}

export function DemoVideo({ videoId, title = "Demo Video" }: DemoVideoProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
