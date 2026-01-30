import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

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

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          {t("headline")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          {t("subheadline")}
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/technology">{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
