"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "./language-switcher";

const navItems = [
  { key: "home", href: "/" },
  { key: "problem", href: "/problem" },
  { key: "solution", href: "/solution" },
  { key: "technology", href: "/technology" },
  { key: "results", href: "/results" },
  { key: "about", href: "/about" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2">
      <nav className="flex items-center justify-between rounded-full border border-border bg-background/40 px-4 py-2 backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="text-sm font-bold tracking-tight text-foreground">
          ShopControl AI
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors hover:text-foreground ${
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Menu className="size-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>ShopControl AI</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.key}>
                    <Link
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${
                        pathname === item.href
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
