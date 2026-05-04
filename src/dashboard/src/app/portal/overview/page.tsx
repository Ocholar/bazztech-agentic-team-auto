import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import {
    Activity,
    Zap,
    ArrowRight,
    Settings,
    Send,
    Bot,
    AlertCircle,
    CheckCircle2,
    Factory,
    BarChart3,
    TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PortalOverview() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/login');
    }

    const userId = session.user.id;
    const [user, subscriptions, latestLogs] = await Promise.all([
        db.user.findUnique({ where: { id: userId } }),
        db.subscription.findMany({ where: { userId }, orderBy: { startDate: 'desc' } }),
        db.auditLog.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 5 })
    ]);

    const isAdmin = user?.role === 'ADMIN';

    // Calculate trial days (14 days from createdAt)
    const createdAt = user?.createdAt || new Date();
    const trialEndDate = new Date(createdAt.getTime() + 14 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const isTrial = daysRemaining > 0;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 p-6 md:p-10">
            {/* Trial Banner */}
            {isTrial && (
                <div className="mb-8 p-4 rounded-xl border border-[#E07A5F]/30 bg-[#E07A5F]/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E07A5F]/10 flex items-center justify-center text-[#E07A5F]">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">14-Day Free Pilot Active</p>
                            <p className="text-xs text-slate-500">{daysRemaining} days remaining in your factory intelligence trial.</p>
                        </div>
                    </div>
                    <Link
                        href="/pricing"
                        className="px-4 py-2 rounded-lg bg-[#E07A5F] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                        Upgrade to Growth Tier
                    </Link>
                </div>
            )}
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                            Manufacturing Overview
                        </h1>
                        {isAdmin && (
                            <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-200">
                                Owner Access
                            </span>
                        )}
                    </div>
                    <p className="text-slate-500 mt-1">Real-time floor intelligence for {(session.user as any).companyName || 'the factory'}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Live Factory Sync</span>
                    </div>
                </div>
            </div>

            {/* Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <Card className="border-slate-200 shadow-sm transition-hover hover:shadow-md">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Activity size={12} className="text-red-500" />
                            OEE (Avg)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">74.2%</div>
                        <div className="text-[10px] text-green-600 font-bold mt-1 uppercase">↑ 4.8% vs last wk</div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm transition-hover hover:shadow-md">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Zap size={12} className="text-[#E07A5F]" />
                            Unplanned Downtime
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">1.2h</div>
                        <div className="text-[10px] text-green-600 font-bold mt-1 uppercase">↓ 32% Avoided via AI</div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm transition-hover hover:shadow-md">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-slate-900">
                            <TrendingUp size={12} className="text-[#81B29A]" />
                            Throughput
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">14.8k</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Units / Shift</div>
                    </CardContent>
                </Card>

                <Card className="border-red-600 border-2 shadow-lg bg-red-50/10">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-red-900">
                            <Bot size={12} className="text-red-600" />
                            BazzAI Health
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">98%</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-1 uppercase">AI Confidence Index</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Add-ons Status */}
                    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Factory size={16} className="text-slate-400" />
                                Floor Connectors
                            </CardTitle>
                            <Link href="/portal/config" className="text-[10px] font-black uppercase text-red-600 hover:underline">Manage All</Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {[
                                    { name: 'Equipment Telemetry', path: '/portal/config/equipment-telemetry', desc: 'Real-time sensor sync', status: 'ACTIVE' },
                                    { name: 'ERP Bridge', path: '/portal/config/erp-bridge', desc: 'Unified bookkeeping', status: 'INACTIVE' },
                                    { name: 'Audit Vision', path: '/portal/config/audit-vision', desc: 'Automated compliance', status: 'LOCKED' },
                                ].map((addon) => (
                                    <div key={addon.name} className="flex items-center justify-between p-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${addon.status === 'ACTIVE' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                <Zap size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{addon.name}</p>
                                                <p className="text-[11px] text-slate-500 uppercase tracking-tighter font-bold">{addon.desc}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${addon.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                                                addon.status === 'LOCKED' ? 'bg-slate-100 text-slate-500' : 'bg-yellow-50 text-yellow-700'
                                                }`}>
                                                {addon.status}
                                            </span>
                                            <Link href={addon.path} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                                <ArrowRight size={14} className="text-slate-400" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chart Preview */}
                    <Card className="border-slate-200 shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <BarChart3 size={16} className="text-[#81B29A]" />
                                Weekly Throughput Reconciler
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 w-full bg-slate-50 rounded-2xl flex items-end justify-between p-8 gap-2">
                                {[65, 45, 75, 55, 85, 40, 95].map((v, i) => (
                                    <div key={i} className="flex-1 rounded-t-lg bg-red-600 group relative" style={{ height: `${v}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            {v}k
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                                <span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span className="text-red-600">Sun (Proj)</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Feed */}
                <div className="space-y-6">
                    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 p-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-500" />
                                Floor Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {[
                                    { sev: 'CRITICAL', text: 'Mixer-3 Bearing Temp High', time: '09:14' },
                                    { sev: 'WARNING', text: 'Kraft Stock below 1500kg', time: '11:42' },
                                    { sev: 'INFO', text: 'Batch #A92 Reconciled', time: 'Yesterday' },
                                ].map((alert, i) => (
                                    <div key={i} className="p-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${alert.sev === 'CRITICAL' ? 'bg-red-50 text-red-600' :
                                                alert.sev === 'WARNING' ? 'bg-yellow-50 text-yellow-600' : 'bg-blue-50 text-blue-600'
                                                }`}>{alert.sev}</span>
                                            <span className="text-[9px] text-slate-400 font-bold">{alert.time}</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-900">{alert.text}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-900 bg-[#0f2439] text-white shadow-xl shadow-slate-200">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Zap size={16} className="text-[#E07A5F]" />
                                AI Action Needed
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-gray-400 leading-relaxed italic">
                                "Identified 12.4% variance in Glue consumption vs Batch #A91. Potential leak or nozzle calibration issue on Corrugator-2."
                            </p>
                            <button className="w-full py-3 bg-[#E07A5F] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">
                                Run Diagnostics Now
                            </button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
