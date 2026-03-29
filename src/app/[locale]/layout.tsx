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
  title: "MyLife – Training, Nutrition & Life | Kostenlos",
  description:
    "Die smartste Trainings-App die du nie kaufen musst. KI-Gewichtsvorschläge, Athlete Score, Coach Arved — kostenlos. Von einem Lifter für Lifter.",
  keywords: ["Training App", "Workout Tracker", "Athleten Score", "KI Coach", "Fitness App kostenlos", "MyLife Training"],
  openGraph: {
    title: "MyLife – Training, Nutrition & Life",
    description: "Die smartste Trainings-App die du nie kaufen musst. Kostenlos.",
    url: "https://mylife-website.vercel.app",
    siteName: "MyLife",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLife – Training, Nutrition & Life",
    description: "KI-Coach, Athlete Score, Muskel-Heatmap — kostenlos.",
  },
  robots: { index: true, follow: true },
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
      <body className="bg-bg text-white antialiased font-manrope">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
