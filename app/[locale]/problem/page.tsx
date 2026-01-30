import { getTranslations, setRequestLocale } from "next-intl/server";
import { Headphones, Calculator, TrendingUp } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { FeatureCard } from "@/components/features/feature-card";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("problem");

  return (
    <article className="mx-auto max-w-4xl px-4 pt-24 pb-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
        {t("intro")}
      </p>

      <FadeInSection className="mt-12">
        <SectionHeader title={t("challenges.title")} />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={Headphones}
            title={t("challenges.support.title")}
            description={t("challenges.support.description")}
          />
          <FeatureCard
            icon={Calculator}
            title={t("challenges.accounting.title")}
            description={t("challenges.accounting.description")}
          />
          <FeatureCard
            icon={TrendingUp}
            title={t("challenges.scaling.title")}
            description={t("challenges.scaling.description")}
          />
        </div>
      </FadeInSection>

      <FadeInSection delay={0.2} className="mt-12">
        <div className="rounded-r-lg border-l-4 border-primary bg-primary/5 p-6">
          <p className="text-lg leading-relaxed">{t("conclusion")}</p>
        </div>
      </FadeInSection>
    </article>
  );
}
