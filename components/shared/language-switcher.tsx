"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === "de" ? "en" : "de";

  function handleSwitch() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      className="inline-flex items-center justify-center rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
