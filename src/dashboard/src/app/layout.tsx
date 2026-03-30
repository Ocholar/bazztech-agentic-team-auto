import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazz AI | Client Portal",
  description: "Manage your AI automation products — Bazz-Connect, Bazz-Flow, Bazz-Doc, Bazz-Lead",
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
        <Analytics />
      </body>
    </html>
  );
}
