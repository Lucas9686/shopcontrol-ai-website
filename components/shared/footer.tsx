"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        <p>{t("project")}</p>
        <p className="mt-1">
          {t("copyright")}
          {" · "}
          <Link href="/impressum" className="underline hover:text-foreground transition-colors">
            {t("impressum")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
