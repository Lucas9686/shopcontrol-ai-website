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
import Image from "next/image";

const supervisors = [
  {
    nameKey: "supervisors.supervisor1.name",
    roleKey: "supervisors.supervisor1.role",
    image: "/images/team/albin-weiss.jpg",
    social: {
      platform: "Facebook",
      url: "https://www.facebook.com/p/Albin-Wei%C3%9F-100001304398071/?locale=de_DE",
    },
  },
  {
    nameKey: "supervisors.supervisor2.name",
    roleKey: "supervisors.supervisor2.role",
    image: "/images/team/mario-kraiger.jpg",
    social: {
      platform: "Facebook",
      url: "https://www.facebook.com/mario.kraiger?locale=de_DE",
    },
  },
] as const;

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
            <div className="flex items-start gap-5">
              <Image
                src="/images/team/lucas-nessel.jpeg"
                alt={t("author.name")}
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-2xl">{t("author.name")}</CardTitle>
                <Badge className="mt-1 w-fit">{t("author.role")}</Badge>
                <CardDescription className="mt-3 text-base leading-relaxed">
                  {t("author.description")}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </FadeInSection>

      {/* Supervisors */}
      <FadeInSection delay={0.1} className="mt-8">
        <SectionHeader title={t("supervisors.title")} />
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {supervisors.map((sup) => (
            <Card key={sup.nameKey}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={sup.image}
                    alt={t(sup.nameKey)}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div>
                    <CardTitle className="text-lg">{t(sup.nameKey)}</CardTitle>
                    <CardDescription>{t(sup.roleKey)}</CardDescription>
                    <a
                      href={sup.social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <svg
                        className="h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span>{sup.social.platform}</span>
                    </a>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </FadeInSection>

      {/* School */}
      <FadeInSection delay={0.2} className="mt-8">
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
