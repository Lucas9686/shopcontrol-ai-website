import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { HeroAnimated } from "@/components/shared/hero-animated";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { SectionHeader } from "@/components/shared/section-header";
import { DemoVideo } from "@/components/shared/demo-video";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Briefcase, Users, TrendingUp } from "lucide-react";

const overviewCards = [
  { key: "supportAgent", href: "/support-agent" },
  { key: "accounting", href: "/accounting" },
  { key: "financePlan", href: "/finance-plan" },
  { key: "technology", href: "/technology" },
  { key: "about", href: "/about" },
] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");
  const td = await getTranslations("demo");
  const to = await getTranslations("overview");
  const tr = await getTranslations("results");

  const achievementItems = tr.raw("achievements.items") as string[];

  return (
    <>
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, oklch(0.35 0.15 260 / 0.4), transparent)",
          }}
        />

        <HeroAnimated
          headline={t("headline")}
          subheadline={t("subheadline")}
          cta={
            <Button asChild size="lg" className="shimmer-btn">
              <Link href="/support-agent">{t("cta")}</Link>
            </Button>
          }
        />
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInSection>
            <SectionHeader title={to("title")} subtitle={to("subtitle")} />
          </FadeInSection>
          <FadeInSection>
            <div className="mt-10 grid gap-6 md:grid-cols-2 [&>:last-child:nth-child(odd)]:md:col-span-2 [&>:last-child:nth-child(odd)]:md:max-w-[calc(50%-0.75rem)]  [&>:last-child:nth-child(odd)]:md:mx-auto">
              {overviewCards.map(({ key, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="group rounded-lg border border-border/50 bg-card/50 p-6 transition-colors hover:border-primary/30 hover:bg-card"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{to(`${key}.title`)}</h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {to(`${key}.description`)}
                  </p>
                </Link>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="relative py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInSection>
            <SectionHeader title={td("heading")} subtitle={td("subheading")} />
          </FadeInSection>
          <FadeInSection>
            <DemoVideo videoId="dQw4w9WgXcQ" title={td("heading")} />
          </FadeInSection>
        </div>
      </section>

      {/* Erreichte Ergebnisse */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInSection>
            <SectionHeader
              title={tr("achievements.title")}
              subtitle={tr("achievements.subtitle")}
            />
          </FadeInSection>
          <FadeInSection>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 [&>:last-child:nth-child(odd)]:sm:col-span-2 [&>:last-child:nth-child(odd)]:sm:max-w-[calc(50%-0.5rem)] [&>:last-child:nth-child(odd)]:sm:mx-auto">
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
        </div>
      </section>

      {/* Zielgruppe */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInSection>
            <SectionHeader
              title={tr("targetGroup.title")}
              subtitle={tr("targetGroup.subtitle")}
            />
          </FadeInSection>
          <FadeInSection>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{tr("targetGroup.primary.title")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {tr("targetGroup.primary.description")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{tr("targetGroup.secondary.title")}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {tr("targetGroup.secondary.description")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Geschäftsmodell */}
      <section className="relative py-24">
        <div className="mx-auto max-w-5xl px-6">
          <FadeInSection>
            <SectionHeader
              title={tr("businessModel.title")}
              subtitle={tr("businessModel.subtitle")}
            />
          </FadeInSection>
          <FadeInSection>
            <Card className="mt-10">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      {tr("businessModel.description")}
                    </p>
                    <Link
                      href="/finance-plan"
                      className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      {tr("businessModel.cta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
