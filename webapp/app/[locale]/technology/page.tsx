import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShoppingCart, FileSpreadsheet, Mail, Image as ImageIcon, Shield, AlertTriangle, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { FeatureCard } from "@/components/features/feature-card";
import { WorkflowStep } from "@/components/technology/workflow-step";
import { ScreenshotFigure } from "@/components/technology/screenshot-figure";

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("technology");

  const steps = [
    { key: "step1", image: "/images/workflows/gesamter-workflow.png" },
    { key: "step2", image: "/images/workflows/support-agent-mit-tools.png" },
    { key: "step3", image: "/images/workflows/rag-auto-upload.png" },
    { key: "step4", image: "/images/workflows/tools-von-agent.png" },
    { key: "step5", image: "/images/workflows/support-agent-ohne-tools.png" },
    { key: "step6", image: "/images/diagrams/buchhaltung-workflow.png" },
  ] as const;

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
        {t("overview")}
      </p>

      {/* Workflow Steps */}
      <FadeInSection className="mt-16">
        <SectionHeader title={t("workflow.title")} />
      </FadeInSection>

      <div className="mt-10 space-y-16">
        {steps.map((step, i) => (
          <WorkflowStep
            key={step.key}
            number={i + 1}
            title={t(`workflow.${step.key}.title`)}
            description={t(`workflow.${step.key}.description`)}
            imageSrc={step.image}
            imageAlt={t(`workflow.${step.key}.title`)}
            reverse={i % 2 === 1}
          />
        ))}
      </div>

      {/* RAG Section */}
      <FadeInSection className="mt-20">
        <SectionHeader title={t("rag.title")} subtitle={t("rag.subtitle")} />
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t("rag.description")}
        </p>
        <div className="mt-8">
          <ScreenshotFigure
            src="/images/workflows/rag-upload.png"
            alt={t("rag.title")}
            caption={t("rag.caption")}
          />
        </div>
      </FadeInSection>

      {/* Tools & Sub-Agents */}
      <FadeInSection className="mt-20">
        <SectionHeader title={t("tools.title")} subtitle={t("tools.subtitle")} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={ShoppingCart}
            title={t("tools.shopify.title")}
            description={t("tools.shopify.description")}
          />
          <FeatureCard
            icon={FileSpreadsheet}
            title={t("tools.sheets.title")}
            description={t("tools.sheets.description")}
          />
          <FeatureCard
            icon={Mail}
            title={t("tools.email.title")}
            description={t("tools.email.description")}
          />
          <FeatureCard
            icon={ImageIcon}
            title={t("tools.vision.title")}
            description={t("tools.vision.description")}
          />
        </div>
        <div className="mt-8">
          <ScreenshotFigure
            src="/images/workflows/bildanalyse-sektion.png"
            alt={t("tools.vision.title")}
            caption={t("tools.caption")}
          />
        </div>
      </FadeInSection>

      {/* Security */}
      <FadeInSection className="mt-20">
        <SectionHeader title={t("security.title")} subtitle={t("security.subtitle")} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Shield}
            title={t("security.injection.title")}
            description={t("security.injection.description")}
          />
          <FeatureCard
            icon={AlertTriangle}
            title={t("security.errors.title")}
            description={t("security.errors.description")}
          />
          <FeatureCard
            icon={Users}
            title={t("security.escalation.title")}
            description={t("security.escalation.description")}
          />
        </div>
        <div className="mt-8">
          <ScreenshotFigure
            src="/images/workflows/error-trigger.png"
            alt={t("security.errors.title")}
            caption={t("security.caption")}
          />
        </div>
      </FadeInSection>
    </article>
  );
}
