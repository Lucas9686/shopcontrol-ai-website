"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const footerLinks = [
  { key: "supportAgent", href: "/support-agent" },
  { key: "accounting", href: "/accounting" },
  { key: "technology", href: "/technology" },
  { key: "financePlan", href: "/finance-plan" },
  { key: "about", href: "/about" },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {footerLinks.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {tn(item.key)}
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>{t("project")}</p>
          <p className="mt-1">
            {t("copyright")}
            {" · "}
            <Link href="/impressum" className="underline hover:text-foreground transition-colors">
              {t("impressum")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
