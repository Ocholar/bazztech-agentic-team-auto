import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import GlobalBookingModal from "@/components/GlobalBookingModal";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BazzAI | Connected Operations Platform for African Manufacturers",
  description:
    "BazzAI gives African food manufacturers real-time visibility from supplier delivery to customer payment — via WhatsApp. Stop losing orders to chaos. Start your 14-day pilot.",
  keywords: [
    "Manufacturing Operations Platform",
    "African Manufacturers",
    "WhatsApp Order Management",
    "Food Manufacturing Kenya",
    "Supply Chain Visibility",
    "KRA Compliance",
    "M-Pesa Payments",
    "Order to Cash Africa",
    "Nairobi Manufacturing Software",
    "MSME Manufacturing SaaS",
  ],
  openGraph: {
    title: "BazzAI | Connected Operations Platform for African Manufacturers",
    description:
      "Real-time visibility from supplier delivery to customer payment. Built for African food manufacturers. 14-day pilot, no commitment.",
    url: "https://bazztech.co.ke",
    siteName: "BazzAI",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BazzAI — Manufacturing Operations for Africa",
    description:
      "Stop losing orders to WhatsApp chaos. BazzAI brings real-time visibility to African manufacturers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
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
      <body className={`${plusJakartaSans.variable} ${inter.variable}`}>
        {children}
        <WhatsAppButton />
        <Analytics />
        <GlobalBookingModal />
      </body>
    </html>
  );
}
