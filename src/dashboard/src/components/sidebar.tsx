import Link from 'next/link';
import { LayoutDashboard, Send, Settings, Activity } from 'lucide-react';

export function Sidebar() {
    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-zinc-950">
            <div className="flex h-14 items-center border-b px-6 font-bold text-lg text-slate-900">
                Bazz<span className="text-red-600">AI</span> Portal
            </div>
            <nav className="flex-1 space-y-1 p-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                >
                    <LayoutDashboard className="h-4 w-4" />
                    Overview
                </Link>
                <div className="pt-4 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    My Automations
                </div>
                <Link
                    href="/config/bazz-connect"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                >
                    <Settings className="h-4 w-4" />
                    Configure Prompts
                </Link>
                <Link
                    href="/crm"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                >
                    <Send className="h-4 w-4" />
                    CRM Pipeline
                </Link>
            </nav>
            <div className="border-t p-4">
                <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Activity className="h-4 w-4 text-green-500" />
                        System: Online
                    </div>
                    <div className="text-xs text-slate-500">
                        Next Billing: 01 Apr 2026
                    </div>
                </div>
            </div>
        </div>
    );
}
