import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { FadeInSection } from "@/components/shared/fade-in-section";

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("solution");

  const pillars = [
    {
      key: "support" as const,
      icon: Bot,
    },
    {
      key: "accounting" as const,
      icon: FileSpreadsheet,
    },
  ];

  const techItems = ["n8n", "llm", "pinecone", "supabase", "cohere", "shopify", "whatsapp"] as const;

  return (
    <article className="mx-auto max-w-4xl px-4 pt-24 pb-16">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("subtitle")}</p>
      </header>

      <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
        {t("intro")}
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <FadeInSection key={pillar.key} delay={i * 0.15}>
            <Card className="border-border bg-card/50 h-full">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <pillar.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t(`pillars.${pillar.key}.title`)}
                </CardTitle>
                <CardDescription>
                  {t(`pillars.${pillar.key}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {(["f1", "f2", "f3", "f4"] as const).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{t(`pillars.${pillar.key}.features.${f}`)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInSection>
        ))}
      </div>

      <FadeInSection delay={0.3} className="mt-16">
        <SectionHeader title={t("techStack.title")} />
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {techItems.map((item) => (
            <Badge key={item} variant="secondary" className="text-sm px-4 py-1.5">
              {t(`techStack.${item}`)}
            </Badge>
          ))}
        </div>
      </FadeInSection>
    </article>
  );
}
