import { getTranslations, setRequestLocale } from "next-intl/server";
import { Workflow, Brain, Database, ShoppingCart, FileSpreadsheet, MessageCircle, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { FeatureCard } from "@/components/features/feature-card";
import { Link } from "@/i18n/navigation";

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("technology");

  const techStackItems = [
    { key: "n8n", icon: Workflow },
    { key: "openai", icon: Brain },
    { key: "pinecone", icon: Database },
    { key: "shopify", icon: ShoppingCart },
    { key: "sheets", icon: FileSpreadsheet },
    { key: "whatsapp", icon: MessageCircle },
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

      {/* Tech Stack */}
      <FadeInSection className="mt-16">
        <SectionHeader
          title={t("techStack.title")}
          subtitle={t("techStack.subtitle")}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStackItems.map((item) => (
            <FeatureCard
              key={item.key}
              icon={item.icon}
              title={t(`techStack.${item.key}.title`)}
              description={t(`techStack.${item.key}.description`)}
            />
          ))}
        </div>
      </FadeInSection>

      {/* Architecture */}
      <FadeInSection className="mt-16">
        <h2 className="text-2xl font-bold">{t("architecture.title")}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t("architecture.description")}
        </p>
      </FadeInSection>

      {/* Detail Pages */}
      <FadeInSection className="mt-16">
        <SectionHeader title={t("detailPages.title")} />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            href="/support-agent"
            className="group rounded-lg border border-border bg-card/50 p-6 transition-colors hover:border-primary/50 hover:bg-card"
          >
            <h3 className="text-xl font-semibold group-hover:text-primary">
              {t("detailPages.supportAgent.title")}
              <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("detailPages.supportAgent.description")}
            </p>
          </Link>
          <Link
            href="/accounting"
            className="group rounded-lg border border-border bg-card/50 p-6 transition-colors hover:border-primary/50 hover:bg-card"
          >
            <h3 className="text-xl font-semibold group-hover:text-primary">
              {t("detailPages.accounting.title")}
              <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-muted-foreground">
              {t("detailPages.accounting.description")}
            </p>
          </Link>
        </div>
      </FadeInSection>
    </article>
  );
}
