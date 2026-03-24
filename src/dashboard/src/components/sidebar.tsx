import Link from 'next/link';
import { LayoutDashboard, Send, Settings, Activity, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    className?: string;
}

export function Sidebar({ isOpen, onClose, className }: SidebarProps) {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r bg-white dark:bg-zinc-950 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:flex",
                isOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}>
                <div className="flex h-14 items-center justify-between border-b px-6 font-bold text-lg text-slate-900 dark:text-white">
                    <Link href="/" onClick={onClose}>
                        Bazz<span className="text-red-600">AI</span> Portal
                    </Link>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-md hover:bg-slate-100 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                    <Link
                        href="/admin"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </Link>
                    
                    <div className="pt-4 pb-2 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        My Automations
                    </div>
                    
                    <Link
                        href="/portal"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                    >
                        <Settings className="h-4 w-4" />
                        Configure Prompts
                    </Link>
                    
                    <Link
                        href="/blog"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-zinc-800"
                    >
                        <Send className="h-4 w-4" />
                        CRM Pipeline
                    </Link>
                </nav>
                
                <div className="border-t p-4">
                    <div className="flex flex-col gap-2 rounded-lg bg-slate-50 dark:bg-zinc-900 p-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                            <Activity className="h-4 w-4 text-green-500" />
                            System: Online
                        </div>
                        <div className="text-xs text-slate-500">
                            Next Billing: 01 Apr 2026
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
