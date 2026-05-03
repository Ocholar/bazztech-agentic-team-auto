import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-card';
import { Activity, Zap, AlertTriangle, CheckCircle2, MoreVertical } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MachinesPage() {
    const session = await auth();
    if (!session) redirect('/login');

    // In a real multi-tenant system, these would come from the DB linked to the tenant
    const machines = [
        { id: 'm1', name: 'Corrugator-1', status: 'RUNNING', oee: 84, temp: 42, lastSeen: '2m ago', health: 'GOOD' },
        { id: 'm2', name: 'Flexo-Folder-Gluer', status: 'WARNING', oee: 62, temp: 88, lastSeen: '1m ago', health: 'CHECK_BEARING' },
        { id: 'm3', name: 'Die-Cutter', status: 'RUNNING', oee: 91, temp: 38, lastSeen: '5m ago', health: 'GOOD' },
        { id: 'm4', name: 'Palletizer', status: 'OFFLINE', oee: 0, temp: 22, lastSeen: '4h ago', health: 'MAINTENANCE' },
    ];

    return (
        <div className="p-6 md:p-10 bg-slate-50/50 min-h-screen">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Machines & Telemetry</h1>
                    <p className="text-slate-500 mt-1">Real-time health monitoring and OEE tracking across the floor.</p>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                    Register New Machine
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {machines.map((m) => (
                    <Card key={m.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${m.status === 'RUNNING' ? 'bg-green-500 animate-pulse' :
                                        m.status === 'WARNING' ? 'bg-yellow-500' : 'bg-slate-300'
                                    }`} />
                                <CardTitle className="text-sm font-bold">{m.name}</CardTitle>
                            </div>
                            <MoreVertical size={14} className="text-slate-400 cursor-pointer" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline gap-1 mt-2">
                                <span className="text-3xl font-black text-slate-900">{m.oee}%</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OEE</span>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Temperature</span>
                                    <span className={`font-bold ${m.temp > 80 ? 'text-red-600' : 'text-slate-900'}`}>{m.temp}°C</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Status</span>
                                    <span className={`font-bold text-[10px] px-2 py-0.5 rounded-full ${m.status === 'RUNNING' ? 'bg-green-50 text-green-700' :
                                            m.status === 'WARNING' ? 'bg-yellow-50 text-yellow-700' : 'bg-slate-100 text-slate-700'
                                        }`}>{m.status}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500">Health</span>
                                    <span className="font-bold flex items-center gap-1">
                                        {m.health === 'GOOD' ? <CheckCircle2 size={12} className="text-green-500" /> : <AlertTriangle size={12} className="text-yellow-500" />}
                                        {m.health.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-2 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors">
                                View Full Analytics
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-slate-200 shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Activity size={18} className="text-red-500" />
                        Live Vibration Stream (G-Force)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 w-full bg-slate-50 rounded-xl flex items-end justify-between p-4 gap-1">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className="bg-red-500/20 rounded-t w-full" style={{ height: `${Math.random() * 100}%` }} />
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        <span>T-minus 60s</span>
                        <span className="text-red-500 animate-pulse font-black italic">● Live Telemetry Data</span>
                        <span>Now</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
