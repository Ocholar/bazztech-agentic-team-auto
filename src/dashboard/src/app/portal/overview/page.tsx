import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import {
    Activity,
    Zap,
    ArrowRight,
    Bot,
    AlertCircle,
    CheckCircle2,
    Factory,
    BarChart3,
    Clock,
    Shield,
    Globe,
    Send,
    Rocket
} from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const CONNECTORS = [
    {
        productType: 'BAZZ_CONNECT',
        title: 'Equipment Telemetry',
        desc: 'Connect SCADA, PLC, and sensor data for real-time OEE tracking and predictive maintenance alerts.',
        path: '/portal/config/equipment-telemetry',
        icon: Zap,
        color: '#F2CC8F',
        step: 1,
    },
    {
        productType: 'BAZZ_FLOW',
        title: 'ERP Bridge',
        desc: 'Synchronize M-Pesa, Stripe, and your ERP ledger for automated financial reconciliation.',
        path: '/portal/config/erp-bridge',
        icon: Globe,
        color: '#81B29A',
        step: 2,
    },
    {
        productType: 'BAZZ_DOC',
        title: 'Audit Vision',
        desc: 'Automate compliance documentation — KRA invoices, KEBS batch records, and quality certificates.',
        path: '/portal/config/audit-vision',
        icon: Bot,
        color: '#E07A5F',
        step: 3,
    },
    {
        productType: 'BAZZ_LEAD',
        title: 'Production Comms',
        desc: 'Route critical floor alerts and CRM events directly to management via WhatsApp.',
        path: '/portal/config/production-comms',
        icon: Send,
        color: '#4299E1',
        step: 4,
    },
];

export default async function PortalOverview() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/login');
    }

    const userId = session.user.id;
    const [user, subscriptions, configs] = await Promise.all([
        db.user.findUnique({ where: { id: userId } }),
        db.subscription.findMany({ where: { userId }, orderBy: { startDate: 'desc' } }),
        db.productConfig.findMany({ where: { userId } }),
    ]);

    const isAdmin = user?.role === 'ADMIN';

    // Calculate trial days
    const createdAt = user?.createdAt || new Date();
    const trialEndDate = new Date(createdAt.getTime() + 14 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysRemaining = Math.max(0, Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const isTrial = daysRemaining > 0;

    // Check connector statuses
    const getConnectorStatus = (productType: string) => {
        const sub = subscriptions.find(s => s.productType === productType);
        const config = configs.find(c => c.productType === productType);
        if (isAdmin || (sub?.status === 'ACTIVE' && config)) return 'ACTIVE';
        if (sub?.status === 'ACTIVE') return 'NEEDS_CONFIG';
        if (sub) return 'PENDING';
        return 'NOT_CONNECTED';
    };

    const activeCount = CONNECTORS.filter(c => getConnectorStatus(c.productType) === 'ACTIVE').length;
    const hasAnyActive = activeCount > 0;

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
                            <p className="text-xs text-slate-500">{daysRemaining} days remaining — connect your first data source to see AI in action.</p>
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
                    <p className="text-slate-500 mt-1">Real-time floor intelligence for {(session.user as any).companyName || 'your factory'}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hasAnyActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            {hasAnyActive ? 'Live Factory Sync' : 'Awaiting Connection'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Onboarding Progress */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Rocket size={20} className="text-[#E07A5F]" />
                        <h2 className="text-lg font-black text-slate-900">Get Started — Connect Your Factory</h2>
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase">{activeCount} of {CONNECTORS.length} connected</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full mb-8 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${(activeCount / CONNECTORS.length) * 100}%`,
                            background: 'linear-gradient(90deg, #81B29A, #E07A5F)',
                        }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CONNECTORS.map((connector) => {
                        const status = getConnectorStatus(connector.productType);
                        const isActive = status === 'ACTIVE';
                        const isPending = status === 'PENDING' || status === 'NEEDS_CONFIG';

                        return (
                            <Card
                                key={connector.productType}
                                className={`border transition-all hover:shadow-md ${isActive ? 'border-green-300 bg-green-50/30' :
                                        isPending ? 'border-yellow-300 bg-yellow-50/20' :
                                            'border-slate-200'
                                    }`}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                                                style={{ background: connector.color }}
                                            >
                                                <connector.icon size={18} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-sm font-black">
                                                    Step {connector.step}: {connector.title}
                                                </CardTitle>
                                            </div>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase px-2 py-1 rounded-full ${isActive ? 'bg-green-100 text-green-700' :
                                                isPending ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-slate-100 text-slate-400'
                                            }`}>
                                            {isActive ? <><CheckCircle2 size={12} /> Connected</> :
                                                isPending ? <><AlertCircle size={12} /> Pending</> :
                                                    'Not Connected'}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{connector.desc}</p>
                                    <Link
                                        href={connector.path}
                                        className={`w-full py-2.5 rounded-lg font-bold text-xs text-center block transition-all flex items-center justify-center gap-2 ${isActive
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-slate-900 text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        {isActive ? 'View Configuration' : 'Connect Now'} <ArrowRight size={14} />
                                    </Link>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Chart Preview */}
                    <Card className="border-slate-200 shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <BarChart3 size={16} className="text-[#81B29A]" />
                                Throughput Analytics
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {hasAnyActive ? (
                                <div className="h-64 w-full bg-slate-50 rounded-2xl flex items-end justify-between p-8 gap-2">
                                    {[65, 45, 75, 55, 85, 40, 95].map((v, i) => (
                                        <div key={i} className="flex-1 rounded-t-lg bg-red-600 group relative" style={{ height: `${v}%` }}>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                {v}k
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-64 w-full bg-slate-50 rounded-2xl flex flex-col items-center justify-center text-center p-8">
                                    <BarChart3 size={48} className="text-slate-200 mb-4" />
                                    <p className="text-sm font-bold text-slate-400 mb-1">No throughput data yet</p>
                                    <p className="text-xs text-slate-400">Connect Equipment Telemetry to start tracking production metrics.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Feed */}
                <div className="space-y-6">
                    {/* Floor Alerts */}
                    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 border-b border-slate-100 p-4">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-500" />
                                Floor Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {hasAnyActive ? (
                                <div className="p-6 text-center">
                                    <CheckCircle2 size={32} className="text-green-400 mx-auto mb-3" />
                                    <p className="text-xs font-bold text-slate-500">All systems nominal</p>
                                    <p className="text-[10px] text-slate-400 mt-1">No active alerts.</p>
                                </div>
                            ) : (
                                <div className="p-6 text-center">
                                    <Shield size={32} className="text-slate-200 mx-auto mb-3" />
                                    <p className="text-xs font-bold text-slate-400">No alerts yet</p>
                                    <p className="text-[10px] text-slate-400 mt-1">Alerts will appear here once your sensors are connected.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* AI Teaser */}
                    <Card className="border-2 border-slate-900 bg-[#0f2439] text-white shadow-xl shadow-slate-200">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                                <Zap size={16} className="text-[#E07A5F]" />
                                BazzAI Intelligence
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-xs text-gray-400 leading-relaxed italic">
                                {hasAnyActive
                                    ? '"Connect more data sources to unlock deeper manufacturing intelligence and predictive maintenance."'
                                    : '"Connect your first Floor Connector to activate AI-driven insights for your factory operations."'
                                }
                            </p>
                            <Link
                                href="/portal/config"
                                className="w-full py-3 bg-[#E07A5F] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform block text-center"
                            >
                                {hasAnyActive ? 'Manage Connectors' : 'Start Connecting'}
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
