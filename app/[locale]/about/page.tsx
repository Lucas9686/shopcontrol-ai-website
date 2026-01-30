import { getTranslations, setRequestLocale } from "next-intl/server";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <article className="mx-auto max-w-4xl px-4 pt-24 pb-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      {/* Author */}
      <FadeInSection className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t("author.name")}</CardTitle>
            <Badge className="w-fit">{t("author.role")}</Badge>
            <CardDescription className="mt-3 text-base leading-relaxed">
              {t("author.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </FadeInSection>

      {/* School */}
      <FadeInSection delay={0.1} className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>{t("school.title")}</CardTitle>
            <CardDescription className="text-sm font-medium text-muted-foreground">
              {t("school.department")}
            </CardDescription>
            <CardDescription className="mt-2 text-base leading-relaxed">
              {t("school.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </FadeInSection>

      {/* Supervisors */}
      <FadeInSection delay={0.2} className="mt-8">
        <SectionHeader title={t("supervisors.title")} />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("supervisors.supervisor1.name")}
              </CardTitle>
              <CardDescription>
                {t("supervisors.supervisor1.role")}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {t("supervisors.supervisor2.name")}
              </CardTitle>
              <CardDescription>
                {t("supervisors.supervisor2.role")}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </FadeInSection>

      {/* Competition */}
      <FadeInSection delay={0.3} className="mt-12">
        <div className="rounded-r-lg border-l-4 border-primary bg-primary/5 p-6">
          <h2 className="text-xl font-semibold">{t("competition.title")}</h2>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">
            {t("competition.description")}
          </p>
        </div>
      </FadeInSection>
    </article>
  );
}
