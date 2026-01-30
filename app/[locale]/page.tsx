import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          {t("hero.headline")}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("hero.subheadline")}
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          {t("footer.project")}
        </p>
      </div>
    </main>
  );
}
