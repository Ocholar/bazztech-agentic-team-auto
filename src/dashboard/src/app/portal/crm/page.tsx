import { auth } from '../../../../auth';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Send, Users, Filter, Plus, Phone, Mail, Calendar, Zap, CheckCircle2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { addLead } from './actions';
import { format } from 'date-fns';
import { AddLeadModal } from './add-lead-modal';
import { cn } from '@/lib/utils';

export default async function CRMPage() {
    const session = await auth();
    if (!session || !session.user) redirect('/login');

    let leads: any[] = [];
    let dbError = false;

    try {
        leads = await db.lead.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        dbError = true;
    }

    const stats = {
        total: leads.length,
        new: leads.filter(l => l.stage === 'LEAD').length,
        prospective: leads.filter(l => l.stage === 'PROSPECTIVE').length,
        sales: leads.filter(l => l.stage === 'SALE').length,
    };

    return (
        <main className="flex min-h-screen flex-col p-4 md:p-8 bg-gray-50">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                        <Zap className="text-red-600 animate-pulse" />
                        BazzAI Sales Pipeline
                    </h1>
                    <p className="text-gray-500 mt-1">Autonomous leads qualified by your BazzAI Agent Swarm.</p>
                </div>

                <AddLeadModal />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-blue-600' },
                    { label: 'New/Cold', value: stats.new, icon: Filter, color: 'text-orange-600' },
                    { label: 'Prospective', value: stats.prospective, icon: Zap, color: 'text-purple-600' },
                    { label: 'Closed Sales', value: stats.sales, icon: CheckCircle2, color: 'text-green-600' },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <stat.icon className={`${stat.color} mb-2`} size={20} />
                            <div className="text-2xl font-black">{stat.value}</div>
                            <div className="text-[10px] uppercase font-bold text-slate-400">{stat.label}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Leads Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 uppercase text-[10px] font-bold tracking-wider text-slate-500">
                                <th className="px-6 py-4">Lead Info</th>
                                <th className="px-6 py-4">AI Status</th>
                                <th className="px-6 py-4 text-center">Intent</th>
                                <th className="px-6 py-4">Last Agent Action</th>
                                <th className="px-6 py-4">Captured At</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium italic">
                                        No leads captured yet. Your AI agents are working hard...
                                    </td>
                                </tr>
                            ) : dbError ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-red-500 font-bold">
                                        Database connection dropped while loading leads. Please refresh the page to wake up the server.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-900">{lead.name || 'Anonymous'}</div>
                                            <div className="flex items-center gap-3 mt-1">
                                                {lead.phone && <span className="flex items-center gap-1 text-xs text-slate-500"><Phone size={10} /> {lead.phone}</span>}
                                                {lead.email && <span className="flex items-center gap-1 text-xs text-slate-500"><Mail size={10} /> {lead.email}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                                                lead.stage === 'SALE' ? "bg-green-50 text-green-600 border-green-100" :
                                                    lead.stage === 'PROSPECTIVE' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                                        lead.stage === 'CONTACTED' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                            "bg-slate-100 text-slate-500 border-slate-200"
                                            )}>
                                                {lead.stage}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-semibold text-slate-600 text-center">
                                            {lead.stage === 'PROSPECTIVE' ? (
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">High Intent</span>
                                                    <Zap size={12} className="text-red-500 fill-current" />
                                                </div>
                                            ) : (
                                                <div className="text-slate-300 font-black italic">Normal</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500 max-w-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                                <span className="truncate italic">"{lead.lastMessage || 'N/A'}"</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-500">
                                            <div className="flex items-center gap-1"><Calendar size={12} /> {format(lead.createdAt, 'dd MMM yyyy')}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-xs font-bold text-red-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                                                View Thread
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </main>
    );
}


