import { ZoomableImage } from "@/components/shared/zoomable-image";
import { FadeInSection } from "@/components/shared/fade-in-section";

interface WorkflowStepVerticalProps {
  number: number;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function WorkflowStepVertical({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
}: WorkflowStepVerticalProps) {
  return (
    <FadeInSection>
      <div className="relative flex gap-6">
        {/* Timeline line */}
        <div className="flex flex-col items-center">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
            {number}
          </span>
          <div className="mt-2 w-px flex-1 bg-border" />
        </div>

        {/* Content */}
        <div className="pb-8">
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
    </FadeInSection>
  );
}
