import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { WorkflowStepVertical } from "@/components/shared/workflow-step-vertical";
import { ScreenshotFigure } from "@/components/technology/screenshot-figure";

export default async function AccountingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("accounting");

  const workflowSteps = [
    "step1",
    "step2",
    "step3",
    "step4",
    "step5",
  ] as const;

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* Header */}
      <FadeInSection>
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </header>
      </FadeInSection>

      {/* Problem */}
      <section className="mt-16">
        <FadeInSection>
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-8">
            <h2 className="text-2xl font-bold text-red-400">
              {t("problem.title")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("problem.description")}
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Solution */}
      <section className="mt-16">
        <FadeInSection>
          <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-8">
            <h2 className="text-2xl font-bold text-green-400">
              {t("solution.title")}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t("solution.description")}
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Workflow Overview Screenshot */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold">{t("overview.title")}</h2>
          <div className="mt-6">
            <ScreenshotFigure
              src="/images/accounting/workflow-overview.png"
              alt={t("overview.title")}
              caption={t("overview.caption")}
            />
          </div>
        </FadeInSection>
      </section>

      {/* 5-Step Workflow */}
      <section className="mt-16">
        <SectionHeader
          title={t("workflow.title")}
          subtitle={t("workflow.subtitle")}
        />
        <div className="mt-10 space-y-8">
          {workflowSteps.map((key, index) => (
            <WorkflowStepVertical
              key={key}
              number={index + 1}
              title={t(`workflow.${key}.title`)}
              description={t(`workflow.${key}.description`)}
              isFirst={index === 0}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>
      </section>

      {/* n8n Technical Implementation */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold">{t("n8n.title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("n8n.description")}
          </p>
          <div className="mt-6">
            <ScreenshotFigure
              src="/images/accounting/workflow-n8n.png"
              alt={t("n8n.title")}
              caption={t("n8n.caption")}
            />
          </div>
        </FadeInSection>
      </section>
    </article>
  );
}
