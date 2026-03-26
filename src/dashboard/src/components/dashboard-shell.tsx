"use client";

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Menu, Bot } from 'lucide-react';
import Link from 'next/link';

interface DashboardShellProps {
    children: React.ReactNode;
    bannerText?: string;
    bannerColor?: string;
    role?: 'ADMIN' | 'CLIENT';
}

export function DashboardShell({ children, bannerText, bannerColor = "bg-red-600", role = 'CLIENT' }: DashboardShellProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-white text-slate-900 font-sans">
            {/* Sidebar Component (Hides on mobile, showing only as drawer) */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} role={role} />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile Header (Hidden on lg+) */}
                <header className="flex h-16 items-center justify-between border-b px-6 lg:hidden shrink-0 bg-white">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white">
                            <Bot size={20} />
                        </div>
                        <span className="font-black tracking-tighter">BazzAI</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-md hover:bg-slate-100"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Optional Top Banner (Admin Tower style) */}
                {bannerText && (
                    <div className={`${bannerColor} px-4 md:px-8 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white text-center shrink-0`}>
                        {bannerText}
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
