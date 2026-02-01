import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon | ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const isLucide = typeof icon === "function";
  const Icon = isLucide ? (icon as LucideIcon) : null;

  return (
    <Card className="border-border bg-card/50">
      <CardHeader>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          {Icon ? <Icon className="h-5 w-5 text-primary" /> : icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
