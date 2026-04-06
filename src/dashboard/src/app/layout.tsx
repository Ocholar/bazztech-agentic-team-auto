import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Analytics } from "@vercel/analytics/react";
import { WhatsAppButton } from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BazzAI | Enterprise Automation Swarm",
  description: "Global productized AI agents for enterprise-grade automation. BazzAI delivers autonomous WhatsApp receptionists, M-Pesa/Fintech flow automation, and intelligent document processing.",
  keywords: ["Enterprise AI", "Automation Swarm", "n8n", "WhatsApp API", "M-Pesa Automation", "Autonomous Agents"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: 'light' }}>
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
