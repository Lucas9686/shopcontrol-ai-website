import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { HeroAnimated } from "@/components/shared/hero-animated";
import { FadeInSection } from "@/components/shared/fade-in-section";
import { SectionHeader } from "@/components/shared/section-header";
import { DemoVideo } from "@/components/shared/demo-video";
import { ArrowRight } from "lucide-react";

const overviewCards = [
  { key: "supportAgent", href: "/support-agent" },
  { key: "accounting", href: "/accounting" },
  { key: "results", href: "/results" },
  { key: "financePlan", href: "/finance-plan" },
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

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
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
            <div className="mt-10 grid gap-6 md:grid-cols-2">
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
    </>
  );
}
