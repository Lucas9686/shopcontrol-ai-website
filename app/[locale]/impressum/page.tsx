import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("impressum");

  return (
    <article className="mx-auto max-w-3xl px-4 pt-24 pb-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      <div className="mt-12 space-y-8">
        {/* Impressum */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("impressum.title")}</h2>
          <p className="text-sm font-medium text-muted-foreground">
            {t("impressum.responsible")}
          </p>
          <ul className="space-y-1 text-base">
            <li>{t("impressum.name")}</li>
            <li>{t("impressum.school")}</li>
            <li>{t("impressum.address")}</li>
            <li>{t("impressum.country")}</li>
          </ul>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("impressum.context")}
          </p>
        </section>

        {/* Datenschutz */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">{t("datenschutz.title")}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {t("datenschutz.intro")}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">
                {t("datenschutz.hosting.title")}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {t("datenschutz.hosting.description")}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">
                {t("datenschutz.rights.title")}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-muted-foreground">
                {t("datenschutz.rights.description")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
