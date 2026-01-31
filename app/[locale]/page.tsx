import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { HeroAnimated } from "@/components/shared/hero-animated";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hero");

  return (
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
            <Link href="/technology">{t("cta")}</Link>
          </Button>
        }
      />
    </section>
  );
}
