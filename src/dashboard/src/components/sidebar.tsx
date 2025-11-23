import Link from 'next/link';
import { LayoutDashboard, Send, Settings, Activity } from 'lucide-react';

export function Sidebar() {
    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white dark:bg-zinc-950">
            <div className="flex h-14 items-center border-b px-6 font-semibold">
                Bazztech Agentic
            </div>
            <nav className="flex-1 space-y-1 p-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                </Link>
                <Link
                    href="/submissions"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                >
                    <Send className="h-4 w-4" />
                    Submissions
                </Link>
                <Link
                    href="/config"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                >
                    <Settings className="h-4 w-4" />
                    Configuration
                </Link>
            </nav>
            <div className="border-t p-4">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500">
                    <Activity className="h-4 w-4" />
                    System Status: Online
                </div>
            </div>
        </div>
    );
}
