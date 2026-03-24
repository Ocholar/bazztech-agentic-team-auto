import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-card';
import { Shield, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL_MISSING');
        }

        const subscriptions = await db.subscription.findMany({
            include: { user: true },
            orderBy: { startDate: 'desc' }
        });

        const auditLogs = await db.auditLog.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' }
        });

        // Calculate KPIs
        const activeSubs = await db.subscription.findMany({
            where: { status: 'ACTIVE' },
            select: { oneTimeFee: true, monthlyMaintenanceRate: true }
        });

        const mrr = activeSubs.reduce((acc, sub) => {
            const rate = sub.monthlyMaintenanceRate || 0.2;
            const fee = sub.oneTimeFee || 0;
            return acc + (fee * rate);
        }, 0);

        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const newSignups = await db.user.count({
            where: {
                role: 'CLIENT',
                createdAt: { gte: startOfMonth }
            }
        });

        return (
            <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <Shield className="text-red-600" />
                            Admin Oversight
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Manual overrides and system audit logs</p>
                    </div>
                    <div className="flex gap-4">
                        <Card className="px-6 py-2 border-slate-200">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Est. MRR</div>
                            <div className="text-xl font-black text-red-600">KES {mrr.toLocaleString()}</div>
                        </Card>
                        <Card className="px-6 py-2 border-slate-200">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Monthly Signups</div>
                            <div className="text-xl font-black text-slate-900">{newSignups}</div>
                        </Card>
                    </div>
                </div>

                {/* Subscriptions Overrides */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Client Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <th className="pb-3 px-2">Client / Company</th>
                                    <th className="pb-3 px-2">Product</th>
                                    <th className="pb-3 px-2">Status</th>
                                    <th className="pb-3 px-2">Ref Code</th>
                                    <th className="pb-3 px-2">Tier</th>
                                    <th className="pb-3 px-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {subscriptions.length > 0 ? (
                                    subscriptions.map((sub) => (
                                        <tr key={sub.id} className="border-b border-slate-100 hover:bg-slate-50 last:border-0">
                                            <td className="py-4 px-2">
                                                <div className="font-medium text-slate-900">{sub.user.name || sub.user.email}</div>
                                                <div className="text-xs text-slate-500">{sub.user.companyName}</div>
                                            </td>
                                            <td className="py-4 px-2 font-medium">{sub.productType}</td>
                                            <td className="py-4 px-2">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                    sub.status === 'SUSPENDED' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                                                    }`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 font-mono text-[10px] text-slate-400">{sub.paymentReference}</td>
                                            <td className="py-4 px-2 text-xs text-slate-600">{sub.businessSizeTier}</td>
                                            <td className="py-4 px-2 text-right space-x-4">
                                                <button className="text-xs font-bold text-green-600 hover:text-green-700">Activate</button>
                                                <button className="text-xs font-bold text-red-600 hover:text-red-700">Suspend</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                                <Users size={40} className="mb-2 opacity-20" />
                                                <p className="font-bold text-slate-500">No active subscriptions found.</p>
                                                <p className="text-xs underline">Your database is connected, waiting for first customer.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>

                {/* Audit Logs */}
                <Card>
                    <CardHeader>
                        <CardTitle>Global System Audit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0">
                                    <AlertCircle size={16} className="mt-1 text-slate-400" />
                                    <div>
                                        <div className="text-sm font-semibold">{log.event}</div>
                                        <div className="text-xs text-slate-500">{log.detail}</div>
                                        <div className="text-[10px] text-slate-400 mt-1">{new Date(log.createdAt).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        );
    } catch (error) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-slate-900 text-white">
                <div className="max-w-md w-full bg-slate-800 p-10 rounded-[40px] border border-slate-700 shadow-2xl text-center">
                    <AlertCircle size={60} className="mx-auto text-red-500 mb-6" />
                    <h1 className="text-2xl font-black mb-4">Database Connection Required</h1>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                        The admin dashboard cannot load because the <code className="text-red-400">DATABASE_URL</code> is missing or incorrect in your Vercel settings.
                    </p>
                    <div className="space-y-4 text-left bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                        <div className="text-xs font-bold text-slate-500 uppercase">Next Steps:</div>
                        <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
                            <li>Go to Vercel -> bu3d -> Settings</li>
                            <li>Add <code className="text-pink-400">DATABASE_URL</code></li>
                            <li>Add <code className="text-pink-400">DIRECT_URL</code></li>
                            <li>Redeploy the project</li>
                        </ol>
                    </div>
                    
                    {/* Diagnostic Monitor */}
                    <div className="mt-8 pt-8 border-t border-slate-700 text-left">
                        <div className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Environment Monitior (Safe View)</div>
                        <div className="space-y-2 text-[10px] font-mono mb-4">
                            <div className="flex justify-between border-b border-slate-700/50 pb-1">
                                <span className="text-slate-500">DATABASE_URL:</span>
                                <span className={process.env.DATABASE_URL ? "text-green-400" : "text-red-400"}>
                                    {process.env.DATABASE_URL ? `SET (${process.env.DATABASE_URL.substring(0, 15)}...)` : "MISSING"}
                                </span>
                            </div>
                            <div className="flex justify-between border-b border-slate-700/50 pb-1">
                                <span className="text-slate-500">DIRECT_URL:</span>
                                <span className={process.env.DIRECT_URL ? "text-green-400" : "text-red-400"}>
                                    {process.env.DIRECT_URL ? `SET (${process.env.DIRECT_URL.substring(0, 15)}...)` : "MISSING"}
                                </span>
                            </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                            <div className="text-[10px] font-bold text-red-400 uppercase mb-1">Last Connection Error:</div>
                            <div className="text-[10px] text-red-200/70 break-all">
                                {String(error)}
                            </div>
                        </div>

                        <p className="mt-4 text-[9px] text-slate-500 text-center italic">
                           If any show as 'MISSING' despite being in Vercel, click "Redeploy" in Vercel to sync them.
                        </p>
                    </div>
                </div>
            </main>
        );
    }
}

