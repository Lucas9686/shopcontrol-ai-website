import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { WorkflowStepVertical } from "@/components/shared/workflow-step-vertical";

export default async function SupportAgentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("supportAgent");

  const workflowSteps = [
    { key: "step1", image: "/images/workflows/get-emails.png" },
    { key: "step2", image: "/images/workflows/filter-sektion.png" },
    { key: "step3", image: "/images/workflows/bildanalyse-sektion.png" },
    { key: "step4", image: "/images/workflows/support-agent-mit-tools.png" },
    { key: "step5", image: "/images/workflows/send-emails.png" },
    { key: "step6", image: "/images/workflows/performance-logging.png" },
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

      {/* Workflow */}
      <section className="mt-16">
        <SectionHeader
          title={t("workflow.title")}
          subtitle={t("workflow.subtitle")}
        />
        <div className="mt-10 space-y-8">
          {workflowSteps.map((step, index) => (
            <WorkflowStepVertical
              key={step.key}
              number={index + 1}
              title={t(`workflow.${step.key}.title`)}
              description={t(`workflow.${step.key}.description`)}
              imageSrc={step.image}
              imageAlt={t(`workflow.${step.key}.title`)}
            />
          ))}
        </div>
      </section>

      {/* RAG */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold">{t("rag.title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("rag.description")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            {t("rag.link")}
          </p>
        </FadeInSection>
      </section>

      {/* Tools */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold">{t("tools.title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("tools.description")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            {t("tools.link")}
          </p>
        </FadeInSection>
      </section>

      {/* Security */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold">{t("security.title")}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("security.description")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            {t("security.link")}
          </p>
        </FadeInSection>
      </section>
    </article>
  );
}
