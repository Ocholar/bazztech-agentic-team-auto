import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Analytics } from "@vercel/analytics/react";
import { WhatsAppButton } from "@/components/whatsapp-button";
import GlobalBookingModal from "@/components/GlobalBookingModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BazzAI | Put Your Business on Autopilot with Custom AI Agents",
  description: "Replace manual data entry and repetitive tasks with intelligent AI workflows that work 24/7. Save 20+ hours a week. Book a free 15-minute Automation Audit today.",
  keywords: ["AI Automation", "Business Automation", "WhatsApp AI", "Invoice Processing", "Lead Nurturing", "Workflow Automation", "M-Pesa Integration", "Nairobi AI Agency"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-FKRMXBX4Z3" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FKRMXBX4Z3');
          `
        }} />
      </head>
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
        <Analytics />
        <GlobalBookingModal />
      </body>
    </html>
  );
}
