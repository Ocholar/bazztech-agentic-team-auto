import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-card';
import { ShieldCheck, FileText, Download, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CompliancePage() {
    const session = await auth();
    if (!session) redirect('/login');

    const reports = [
        { id: 'r1', name: 'ISO 9001:2015 QMS Audit', date: 'Oct 14, 2026', status: 'PASSED', score: '98/100' },
        { id: 'r2', name: 'Environment Impact (South Africa)', date: 'Oct 02, 2026', status: 'PASSED', score: 'A+' },
        { id: 'r3', name: 'Machine Safety & Maintenance Log', date: 'Sep 28, 2026', status: 'PENDING', score: '--' },
        { id: 'r4', name: 'OSHA Workplace Safety Report', date: 'Sep 15, 2026', status: 'PASSED', score: '100/100' },
    ];

    return (
        <div className="p-6 md:p-10 bg-slate-50/50 min-h-screen">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Compliance & Audits</h1>
                    <p className="text-slate-500 mt-1">Automated regulatory reporting and real-time safety compliance tracking.</p>
                </div>
                <button className="px-4 py-2 bg-[#81B29A] text-white rounded-xl text-xs font-bold hover:bg-[#709e89] transition-all flex items-center gap-2">
                    <Download size={14} /> Generate Master Export
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Risk Score</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-[#81B29A]">94.2%</div>
                        <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[#81B29A]" style={{ width: '94.2%' }} />
                        </div>
                        <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-tight">Exceeding Industry Benchmarks by +12%</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Violations</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-red-600">0</div>
                        <p className="text-[10px] text-green-600 mt-6 font-bold uppercase tracking-tight">Pure Operational Integrity</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Days Since Incident</p>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-black text-slate-900">412</div>
                        <p className="text-[10px] text-slate-500 mt-6 font-bold uppercase tracking-tight">Streak: New Record</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100 px-6 py-4">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <FileText size={18} className="text-red-500" />
                        Audit History & Artifacts
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-slate-100">
                        {reports.map((r) => (
                            <div key={r.id} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{r.name}</p>
                                        <p className="text-xs text-slate-500">{r.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-center w-20">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Score</p>
                                        <p className="text-sm font-black text-slate-900">{r.score}</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[10px] font-black uppercase text-slate-600">
                                        {r.status === 'PASSED' ? <CheckCircle2 size={12} className="text-green-500" /> : <Clock size={12} className="text-yellow-500" />}
                                        {r.status}
                                    </div>
                                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                                        <Download size={14} className="text-slate-600" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 p-6 rounded-2xl bg-[#0f2439] border border-white/10 flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#E07A5F]">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">Automated Audit Vision Active</h4>
                        <p className="text-sm text-gray-400">AI is continuously screening logs for SOC2 and ISO compliance gaps.</p>
                    </div>
                </div>
                <button className="px-6 py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all">
                    View Live Gaps (0)
                </button>
            </div>
        </div>
    );
}
