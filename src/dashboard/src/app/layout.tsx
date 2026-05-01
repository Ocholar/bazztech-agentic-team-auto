import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import GlobalBookingModal from "@/components/GlobalBookingModal";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BazzAI | AI Manufacturing Intelligence for African Factories",
  description:
    "Your Factory's AI Brain. Machine performance analytics, fault investigation, and production forecasting — powered by AI, built for African manufacturing. Start your 14-day free pilot.",
  keywords: [
    "AI Manufacturing Intelligence",
    "Factory AI Africa",
    "Predictive Maintenance Kenya",
    "Manufacturing Analytics Nigeria",
    "OEE Optimization Africa",
    "RAG Manufacturing AI",
    "Machine Performance Analytics",
    "Production Forecasting Africa",
    "KRA Compliance AI",
    "M-Pesa Manufacturing ERP",
    "African Factory Software",
    "BazzAI",
  ],
  openGraph: {
    title: "BazzAI | Your Factory's AI Brain",
    description:
      "Ask your machines anything. Predict failures before they happen. Turn production data into competitive advantage. AI Manufacturing Intelligence for African factories.",
    url: "https://bazztech.co.ke",
    siteName: "BazzAI",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BazzAI — Your Factory's AI Brain",
    description:
      "Machine performance analytics, fault investigation & production forecasting — powered by AI, built for African manufacturing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FKRMXBX4Z3" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FKRMXBX4Z3');
          `,
          }}
        />
      </head>
      <body className={`${inter.variable}`}>
        {children}
        <WhatsAppButton />
        <Analytics />
        <GlobalBookingModal />
      </body>
    </html>
  );
}
