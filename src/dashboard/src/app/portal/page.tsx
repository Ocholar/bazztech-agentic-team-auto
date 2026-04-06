import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import {
    Activity,
    CreditCard,
    Zap,
    ArrowRight,
    Settings,
    Send,
    Bot,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

import { verifyAndAllotSlots } from './verify-payment';

export const dynamic = 'force-dynamic';

export default async function PortalDashboard({ searchParams }: { searchParams: { orderId?: string, payment?: string } }) {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/login');
    }

    const userId = (session.user as any).id;
    const orderId = searchParams.orderId;

    // Auto-verify if returning from PayPal
    let paymentStatus: any = null;
    if (orderId) {
        paymentStatus = await verifyAndAllotSlots(orderId, userId);
    }

    // Fetch user and subscriptions together
    const [user, subscriptions, totalLeads, saleLeads, latestLogs] = await Promise.all([
        db.user.findUnique({ where: { id: userId } }),
        db.subscription.findMany({ where: { userId }, orderBy: { startDate: 'desc' } }),
        db.lead.count({ where: { userId } }),
        db.lead.count({ where: { userId, stage: 'SALE' } }),
        db.auditLog.findMany({ where: { userId }, orderBy: { createdAt: 'desc' }, take: 5 })
    ]);

    const isAdmin = user?.role === 'ADMIN';
    const availableSlots = isAdmin ? 999 : ((user as any)?.availableSlots || 0);

    // Identify primary subscription
    const activeSub = subscriptions.find(s => s.status === 'ACTIVE');
    const hasAnySub = subscriptions.length > 0;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 p-6 md:p-10">
            {/* Payment Status Banner */}
            {paymentStatus && (
                <div className={`mb-8 p-4 rounded-xl border flex items-center gap-4 animate-in fade-in slide-in-from-top-4 ${paymentStatus.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
                    }`}>
                    {paymentStatus.success ? <CheckCircle2 className="text-green-600" /> : <AlertCircle className="text-red-600" />}
                    <div className="flex-1">
                        <p className="font-bold text-sm">
                            {paymentStatus.success
                                ? `Success! ${paymentStatus.quantity || ''} Universal Slot(s) have been added to your account.`
                                : `Payment Error: ${paymentStatus.error || "Verification failed."}`}
                        </p>
                        {paymentStatus.success && <p className="text-xs opacity-80">You can now use these slots to activate any BazzAI product below.</p>}
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        Welcome back, {(session.user as any).name || 'Client'}
                    </h1>
                    <p className="text-slate-500 mt-1">Manage your AI Digital Employees and CRM metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Sync Status: Active</span>
                    </div>
                </div>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="border-slate-200 shadow-sm transition-hover hover:shadow-md">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <Activity size={14} className="text-red-500" />
                            Total Leads Captured
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">{totalLeads}</div>
                        <div className="text-xs text-slate-400 mt-1">Life-time performance</div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm transition-hover hover:shadow-md">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-500" />
                            Completed Sales
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">{saleLeads}</div>
                        <div className="text-xs text-slate-400 mt-1">Conversion via AI Agent</div>
                    </CardContent>
                </Card>

                <Card className="border-red-200 border-2 shadow-lg bg-red-50/30">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-red-900">
                            <Zap size={14} className="text-red-600 animate-pulse" />
                            Universal Setup Slots
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">{isAdmin ? '∞' : availableSlots}</div>
                        <div className="text-xs text-red-600 mt-1 font-bold">
                            {isAdmin ? 'Business Owner Portal — Master Access' : (availableSlots > 0 ? 'Ready to Activate Agents' : 'All Slotted Units Active')}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Status Table */}
                <Card className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                        <CardTitle className="text-lg font-bold">Your AI Bundles</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {hasAnySub ? (
                            <div className="divide-y divide-slate-100">
                                {subscriptions.map((sub) => (
                                    <div key={sub.id} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sub.status === 'ACTIVE' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                <Bot size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{sub.productType.replace('_', ' ')}</div>
                                                <div className="text-xs text-slate-500">
                                                    Status: {sub.status}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {sub.status === 'ACTIVE' ? (
                                                <Link
                                                    href={`/portal/config?product=${sub.productType}`}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all"
                                                >
                                                    Configure <ArrowRight size={14} />
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/portal/config?product=${sub.productType}`}
                                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-all"
                                                >
                                                    Activate Now
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center text-slate-500">
                                <AlertCircle size={40} className="mx-auto text-slate-300 mb-4" />
                                <p className="font-bold">No active subscriptions found.</p>
                                <p className="text-xs max-w-xs mx-auto mt-2">Browse the BazzAI product suite to hire your first AI digital employee.</p>
                                <Link href="/#products" className="inline-block mt-6 px-6 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-red-100">
                                    Browse Solutions
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Swarm Activity Feed */}
                <div className="space-y-6">
                    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 px-6 py-3">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                <Zap size={14} className="text-red-500" />
                                Live Swarm Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {latestLogs.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {latestLogs.map((log) => (
                                        <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <Bot size={14} className="text-blue-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="text-[11px] font-bold text-slate-900 truncate uppercase tracking-tighter">
                                                    {log.event.replace(/_/g, ' ')}
                                                </div>
                                                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                                                    {log.detail || 'Agent processing...'}
                                                </div>
                                                <div className="text-[9px] text-slate-400 mt-1 italic">
                                                    {new Date(log.createdAt).toLocaleTimeString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center text-slate-400 italic text-xs">
                                    No swarm activity recorded yet.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-red-600 border-2 bg-slate-900 text-white shadow-xl shadow-red-100/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white italic">
                                <Zap className="text-red-500" fill="currentColor" size={20} />
                                Quick Launch
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/portal/config" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <Settings size={18} className="text-slate-400" />
                                    <span className="text-sm font-bold">Configure Agents</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                            </Link>

                            <Link href="/portal/crm" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                <div className="flex items-center gap-3">
                                    <Send size={18} className="text-slate-400" />
                                    <span className="text-sm font-bold">View CRM Pipeline</span>
                                </div>
                                <ArrowRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-bold text-slate-900">Need BazzAI Support?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Our engineers are available to help you calibrate your AI personas or troubleshoot WhatsApp connections.
                            </p>
                            <a
                                href="https://wa.me/254781751937"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 text-white text-xs font-black shadow-lg shadow-green-100 hover:bg-green-600 transition-all active:scale-95"
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Chat on WhatsApp Support
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
