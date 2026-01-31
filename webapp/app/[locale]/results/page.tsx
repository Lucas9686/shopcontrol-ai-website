import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrendingUp, Target, CheckCircle, Users, Briefcase, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("results");

  const achievementItems = t.raw("achievements.items") as string[];

  return (
    <article className="mx-auto max-w-5xl px-4 pt-24 pb-16">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* Erreichte Ergebnisse */}
      <FadeInSection className="mt-16">
        <SectionHeader
          title={t("achievements.title")}
          subtitle={t("achievements.subtitle")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {achievementItems.map((item, index) => (
            <Card key={index}>
              <CardContent className="flex items-start gap-3 pt-6">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <p className="text-muted-foreground leading-relaxed">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeInSection>

      {/* Market & Differentiation */}
      <FadeInSection className="mt-20">
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

      {/* Zielgruppe */}
      <FadeInSection className="mt-20">
        <SectionHeader
          title={t("targetGroup.title")}
          subtitle={t("targetGroup.subtitle")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{t("targetGroup.primary.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("targetGroup.primary.description")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{t("targetGroup.secondary.title")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {t("targetGroup.secondary.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>

      {/* Geschaeftsmodell */}
      <FadeInSection className="mt-20">
        <SectionHeader
          title={t("businessModel.title")}
          subtitle={t("businessModel.subtitle")}
        />
      </FadeInSection>

      <FadeInSection className="mt-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed">
                  {t("businessModel.description")}
                </p>
                <Link
                  href="/finance-plan"
                  className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  {t("businessModel.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>
    </article>
  );
}
