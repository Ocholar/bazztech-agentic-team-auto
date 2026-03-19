import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bazz AI | Client Portal",
  description: "Manage your AI automation products — Bazz-Connect, Bazz-Flow, Bazz-Doc, Bazz-Lead",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '/';

  // Public routes that don't need auth check
  const publicPaths = ['/login', '/register', '/api/'];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  if (!isPublic) {
    const session = await auth();
    if (!session) {
      redirect('/login');
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
