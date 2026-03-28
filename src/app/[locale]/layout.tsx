import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Barlow_Condensed, Manrope, Courier_Prime } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MyLife – Training, Nutrition & Life",
  description:
    "Die App-Familie für Lifter. Training tracken, Makros berechnen, Gewohnheiten aufbauen – alles verbunden. Kostenlos.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "de" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`scroll-smooth ${barlow.variable} ${manrope.variable} ${courierPrime.variable}`}
    >
      <body
        className="bg-bg text-white antialiased font-manrope"
        style={{ backgroundColor: "#080808" }}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
