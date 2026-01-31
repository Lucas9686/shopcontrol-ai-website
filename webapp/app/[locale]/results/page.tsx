import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrendingUp, Target } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueForecastChart } from "@/components/results/revenue-forecast-chart";
import { PricingComparisonChart } from "@/components/results/pricing-comparison-chart";
import { ScenarioChart } from "@/components/results/scenario-chart";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("results");

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* Results & Market Differentiation */}
      <FadeInSection className="mt-16">
        <SectionHeader
          title={t("market.title")}
          subtitle={t("market.subtitle")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{t("market.results.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("market.results.description")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{t("market.differentiation.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("market.differentiation.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>

      {/* Financial Plan */}
      <FadeInSection className="mt-20">
        <SectionHeader
          title={t("financials.title")}
          subtitle={t("financials.subtitle")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <PricingComparisonChart
          title={t("financials.pricing.title")}
          description={t("financials.pricing.description")}
          labels={{
            basic: t("charts.basic"),
            pro: t("charts.pro"),
            enterprise: t("charts.enterprise"),
            pricePerMonth: t("charts.pricePerMonth"),
          }}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <RevenueForecastChart
          title={t("financials.forecast.title")}
          description={t("financials.forecast.description")}
          labels={{
            revenue: t("charts.revenue"),
            costs: t("charts.costs"),
            year1: t("charts.year1"),
            year2: t("charts.year2"),
            year3: t("charts.year3"),
          }}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <ScenarioChart
          title={t("financials.scenario.title")}
          description={t("financials.scenario.description")}
          labels={{
            optimistic: t("charts.optimistic"),
            realistic: t("charts.realistic"),
            pessimistic: t("charts.pessimistic"),
            year1: t("charts.year1"),
            year2: t("charts.year2"),
            year3: t("charts.year3"),
          }}
        />
      </FadeInSection>
    </article>
  );
}
