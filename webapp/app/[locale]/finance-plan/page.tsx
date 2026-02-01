import { getTranslations, setRequestLocale } from "next-intl/server";
import { DollarSign, TrendingDown, BarChart3, Users } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingComparisonChart } from "@/components/results/pricing-comparison-chart";
import { RevenueForecastChart } from "@/components/results/revenue-forecast-chart";
import { ScenarioChart } from "@/components/results/scenario-chart";

export default async function FinancePlanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("financePlan");

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* Kostenstruktur */}
      <FadeInSection className="mt-16">
        <SectionHeader
          title={t("costStructure.title")}
          subtitle={t("costStructure.subtitle")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">Token-Kosten</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {t("costStructure.tokenCosts")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <CardTitle className="text-base">Kosten pro E-Mail</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {t("costStructure.monthlyCosts")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Users className="h-5 w-5 text-orange-500" />
                </div>
                <CardTitle className="text-base">Menschlicher Agent</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                {t("costStructure.humanCosts")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <TrendingDown className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle className="text-base">Einsparung</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm font-semibold">
                {t("costStructure.savings")}
              </p>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>

      {/* Preismodell */}
      <FadeInSection className="mt-20">
        <SectionHeader
          title={t("pricing.title")}
          subtitle={t("pricing.description")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <PricingComparisonChart
          title={t("pricing.title")}
          description={t("pricing.description")}
          labels={{
            basic: t("charts.basic"),
            pro: t("charts.pro"),
            enterprise: t("charts.enterprise"),
            pricePerMonth: t("charts.pricePerMonth"),
          }}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>{t("pricing.starter.name")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{t("pricing.starter.price")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("pricing.starter.original")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("pricing.starter.target")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("pricing.pro.name")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{t("pricing.pro.price")}</p>
              <p className="text-xs text-muted-foreground mt-1">{t("pricing.pro.original")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("pricing.pro.target")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("pricing.enterprise.name")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{t("pricing.enterprise.price")}</p>
              <p className="text-sm text-muted-foreground mt-2">{t("pricing.enterprise.target")}</p>
            </CardContent>
          </Card>
        </div>
        <p className="mt-4 text-center text-sm font-medium text-muted-foreground">
          {t("pricing.margin")}
        </p>
      </FadeInSection>

      {/* Kernannahmen */}
      <FadeInSection className="mt-20">
        <SectionHeader title={t("assumptions.title")} />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">180 €</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("assumptions.avgRevenueLabel")}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">80–120 €</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("assumptions.cacLabel")}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">5–8%</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("assumptions.churnLabel")}</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">15 → 180</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("assumptions.customersLabel")}</p>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>

      {/* 3-Jahres-Prognose */}
      <FadeInSection className="mt-20">
        <SectionHeader
          title={t("forecast.title")}
          subtitle={t("forecast.description")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <RevenueForecastChart
          title={t("forecast.title")}
          description={t("forecast.description")}
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
        <div className="grid gap-4 sm:grid-cols-3">
          {(["year1", "year2", "year3"] as const).map((year, i) => (
            <Card key={year}>
              <CardHeader>
                <CardTitle className="text-base">{t(`charts.${year}`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t("charts.revenue")}: <span className="font-semibold text-foreground">{t(`forecast.${year}.revenue`)}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Profit: <span className="font-semibold text-green-500">{t(`forecast.${year}.profit`)}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeInSection>

      {/* Szenarioanalyse */}
      <FadeInSection className="mt-20">
        <SectionHeader
          title={t("scenario.title")}
          subtitle={t("scenario.description")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <ScenarioChart
          title={t("scenario.title")}
          description={t("scenario.description")}
          labels={{
            optimistic: t("charts.optimistic"),
            realistic: t("charts.realistic"),
            pessimistic: t("charts.pessimistic"),
            year1: t("charts.year1"),
            year2: t("charts.year2"),
            year3: t("charts.year3"),
          }}
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {t("scenario.conservative")}
        </p>
      </FadeInSection>
    </article>
  );
}
