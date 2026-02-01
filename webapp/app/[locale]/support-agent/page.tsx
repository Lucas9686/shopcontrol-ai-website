import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpen, Wrench, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { WorkflowStepVertical } from "@/components/shared/workflow-step-vertical";
import { ZoomableImage } from "@/components/shared/zoomable-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      {/* Simplified Workflow Diagram */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-center">{t("overviewDiagram.title")}</h2>
          <p className="mt-2 text-center text-muted-foreground">{t("overviewDiagram.subtitle")}</p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <ZoomableImage
              src="/images/workflows/support-agent-ablauf-vereinfacht.png"
              alt={t("overviewDiagram.title")}
              width={1200}
              height={675}
            />
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
              isFirst={index === 0}
              isLast={index === workflowSteps.length - 1}
              imageSrc={step.image}
              imageAlt={t(`workflow.${step.key}.title`)}
            />
          ))}
        </div>
      </section>

      {/* Full n8n Workflow */}
      <section className="mt-16">
        <FadeInSection>
          <h2 className="text-2xl font-bold text-center">{t("n8nWorkflow.title")}</h2>
          <p className="mt-2 text-center text-muted-foreground">{t("n8nWorkflow.subtitle")}</p>
          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <ZoomableImage
              src="/images/workflows/gesamter-workflow-n8n.png"
              alt={t("n8nWorkflow.title")}
              width={1200}
              height={675}
            />
          </div>
        </FadeInSection>
      </section>

      {/* RAG / Tools / Security */}
      <section className="mt-16">
        <FadeInSection>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg">{t("rag.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("rag.description")}
                </p>
                <p className="mt-3 text-xs text-muted-foreground italic">
                  {t("rag.link")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <Wrench className="h-5 w-5 text-orange-500" />
                  </div>
                  <CardTitle className="text-lg">{t("tools.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("tools.description")}
                </p>
                <p className="mt-3 text-xs text-muted-foreground italic">
                  {t("tools.link")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="text-lg">{t("security.title")}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("security.description")}
                </p>
                <p className="mt-3 text-xs text-muted-foreground italic">
                  {t("security.link")}
                </p>
              </CardContent>
            </Card>
          </div>
        </FadeInSection>
      </section>
    </article>
  );
}
