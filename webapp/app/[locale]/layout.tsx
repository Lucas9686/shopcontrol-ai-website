import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isDE = locale === "de";
  return {
    metadataBase: new URL(
      process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://shopcontrol-ai.vercel.app"
    ),
    title: {
      default: "ShopControl AI - Jugend Innovativ 2026",
      template: "%s | ShopControl AI",
    },
    description: isDE
      ? "KI-gestützte Automatisierung für Online-Shops. Ein Projekt der HTL Klagenfurt."
      : "AI-powered automation for online shops. A project by HTL Klagenfurt.",
    openGraph: {
      title: "ShopControl AI - Jugend Innovativ 2026",
      description: isDE
        ? "KI-gestützte Automatisierung für Online-Shops."
        : "AI-powered automation for online shops.",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
      locale: isDE ? "de_AT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <div className="noise-overlay" aria-hidden="true" />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
