import Image from "next/image";
import { FadeInSection } from "@/components/shared/fade-in-section";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export function WorkflowStep({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
}: WorkflowStepProps) {
  return (
    <FadeInSection>
      <div className={`grid items-center gap-8 md:grid-cols-2 ${reverse ? "direction-rtl" : ""}`}>
        <div className={`space-y-4 ${reverse ? "md:order-2" : ""}`}>
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {number}
            </span>
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <div className={reverse ? "md:order-1" : ""}>
          <div className="overflow-hidden rounded-lg border border-border">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={675}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
