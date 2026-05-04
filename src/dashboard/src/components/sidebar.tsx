import Link from 'next/link';
import { LayoutDashboard, Send, Settings, Activity, X, Shield, Zap, Globe, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    className?: string;
    role?: 'ADMIN' | 'CLIENT';
}

export function Sidebar({ isOpen, onClose, className, role = 'CLIENT' }: SidebarProps) {
    const pathname = usePathname();

    const base = role === 'ADMIN' ? '/admin' : '/portal';
    const prefix = pathname.startsWith(base) ? base : '';
    const dashboardHref = `${base}/overview`;
    const machinesHref = `${base}/machines`;
    const inventoryHref = `${base}/inventory`;
    const complianceHref = `${base}/compliance`;

    // Floor System Add-ons
    const telemetryHref = `${base}/config/equipment-telemetry`;
    const bridgeHref = `${base}/config/erp-bridge`;
    const visionHref = `${base}/config/audit-vision`;
    const commsHref = `${base}/config/production-comms`;

    const activeCls = 'text-white font-bold';
    const activeStyle = { background: 'var(--color-primary)' };
    const inactiveCls = 'text-gray-700 hover:bg-gray-100';

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 backdrop-blur-sm lg:hidden transition-opacity"
                    style={{ background: 'rgba(26,58,82,0.4)' }}
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div className={cn(
                "fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:flex",
                isOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}>
                {/* Brand header */}
                <div className="flex h-14 items-center justify-between border-b px-6 font-bold text-lg"
                    style={{ borderColor: '#e8eef4' }}>
                    <Link href="/" onClick={onClose} className="font-black" style={{ fontFamily: 'var(--font-headline)' }}>
                        Bazz<span style={{ color: 'var(--color-action)' }}>AI</span>
                        <span className="ml-1 text-sm font-semibold text-slate-500">
                            {role === 'ADMIN' ? 'Admin' : 'Portal'}
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        title="Close menu"
                        aria-label="Close menu"
                        className="p-1 rounded-md hover:bg-slate-100 lg:hidden">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                    <Link href={dashboardHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === dashboardHref ? activeCls : inactiveCls
                        )}
                        style={pathname === dashboardHref ? activeStyle : {}}>
                        <LayoutDashboard className="h-4 w-4" /> Overview
                    </Link>

                    <Link href={machinesHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === machinesHref ? activeCls : inactiveCls
                        )}
                        style={pathname === machinesHref ? activeStyle : {}}>
                        <Activity className="h-4 w-4" /> Bazz-Monitor
                    </Link>

                    <Link href={inventoryHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === inventoryHref ? activeCls : inactiveCls
                        )}
                        style={pathname === inventoryHref ? activeStyle : {}}>
                        <Settings className="h-4 w-4" /> Bazz-Scale
                    </Link>

                    <Link href={complianceHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === complianceHref ? activeCls : inactiveCls
                        )}
                        style={pathname === complianceHref ? activeStyle : {}}>
                        <Shield className="h-4 w-4" /> Bazz-Secure
                    </Link>

                    <div className="pt-4 pb-2 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Floor Connectors
                    </div>

                    <Link href={telemetryHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === telemetryHref ? activeCls : inactiveCls
                        )}
                        style={pathname === telemetryHref ? activeStyle : {}}>
                        <Zap className="h-4 w-4 text-[#F2CC8F]" /> Bazz-Compute
                    </Link>

                    <Link href={bridgeHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === bridgeHref ? activeCls : inactiveCls
                        )}
                        style={pathname === bridgeHref ? activeStyle : {}}>
                        <Globe className="h-4 w-4 text-[#81B29A]" /> Bazz-Bridge
                    </Link>

                    <Link href={visionHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === visionHref ? activeCls : inactiveCls
                        )}
                        style={pathname === visionHref ? activeStyle : {}}>
                        <Bot className="h-4 w-4 text-[#E07A5F]" /> Bazz-Vision
                    </Link>

                    <Link href={commsHref} onClick={onClose}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                            pathname === commsHref ? activeCls : inactiveCls
                        )}
                        style={pathname === commsHref ? activeStyle : {}}>
                        <Send className="h-4 w-4 text-[#E07A5F]" /> Bazz-Flow
                    </Link>

                </nav>

                <div className="border-t p-4" style={{ borderColor: '#e8eef4' }}>
                    <div className="flex flex-col gap-2 rounded-lg p-3" style={{ background: 'var(--color-bg-light)' }}>
                        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                            <Activity className="h-4 w-4" style={{ color: 'var(--color-success)' }} />
                            System: Online
                        </div>
                        <div className="text-xs text-slate-500">Support Active</div>
                    </div>
                </div>
            </div>
        </>
    );
}
