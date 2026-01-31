import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function FinancePlanPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("financePlan");

  return (
    <article className="mx-auto max-w-4xl px-4 pt-24 pb-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
      </header>

      <p className="mt-8 text-center text-lg text-muted-foreground">
        {t("placeholder")}
      </p>
    </article>
  );
}
