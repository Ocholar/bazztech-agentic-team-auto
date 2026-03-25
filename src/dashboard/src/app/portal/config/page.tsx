import { auth } from '../../../../auth';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Settings, Bot, Database, Zap, CheckCircle2 } from 'lucide-react';
import { saveProductConfig } from './actions';
import { redirect } from 'next/navigation';

export default async function ConfigPage() {
    const session = await auth();
    if (!session || !session.user) redirect('/login');

    const activeSubs = await db.subscription.findMany({
        where: { userId: session.user.id }
    });

    const isSubActive = (type: string) => activeSubs.some(s => s.productType === type && s.status === 'ACTIVE');
    const isSubPending = (type: string) => activeSubs.some(s => s.productType === type && s.status === 'INACTIVE');

    const products = [
        { id: 'BAZZ_CONNECT', title: 'Bazz-Connect', path: '/portal/config/bazz-connect', icon: Bot, desc: 'WhatsApp & Meta API Configuration', color: 'text-green-600', linkText: 'Configure WhatsApp Brain' },
        { id: 'BAZZ_FLOW', title: 'Bazz-Flow M-Pesa', path: '/portal/config/bazz-flow', icon: Zap, desc: 'Daraja 3.0 & ERP Automation', color: 'text-blue-600', linkText: 'Configure Daraja Keys' },
        { id: 'BAZZ_DOC', title: 'Bazz-Doc AI', path: '/portal/config/bazz-doc', icon: Database, desc: 'Vision OCR Structured Parsing', color: 'text-purple-600', linkText: 'Define JSON Schema' },
        { id: 'BAZZ_LEAD', title: 'Bazz-Lead Agent', path: '/portal/config/bazz-lead', icon: Settings, desc: 'Social Media & Meeting Scheduling', color: 'text-orange-600', linkText: 'Configure CRM Agent' },
    ];

    return (
        <main className="flex min-h-screen flex-col p-4 md:p-8 bg-gray-50">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                    <Settings className="text-red-600" />
                    BazzAI Configuration Hub
                </h1>
                <p className="text-gray-500 mt-1">Select an active product to configure its unique AI parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {products.map((m) => {
                    const active = isSubActive(m.id);
                    const pending = isSubPending(m.id);
                    const stateColor = active ? 'bg-green-100 text-green-700 border-green-200' : (pending ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-slate-100 text-slate-500 border-slate-200');

                    return (
                        <Card key={m.id} className={`hover:shadow-lg transition-all border ${active ? 'border-green-200' : (pending ? 'border-orange-200' : 'border-slate-200 opacity-70')}`}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-slate-50 ${m.color}`}>
                                            <m.icon size={24} />
                                        </div>
                                        <div>
                                            <CardTitle>{m.title}</CardTitle>
                                            <CardDescription>{m.desc}</CardDescription>
                                        </div>
                                    </div>
                                    <div className={`px-2 py-1 text-[10px] font-black uppercase rounded-lg border ${stateColor}`}>
                                        {active ? 'ACTIVE' : (pending ? 'PENDING PYMT' : 'NOT SUBSCRIBED')}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <a
                                    href={m.path}
                                    className={`w-full py-3 rounded-lg font-bold text-sm text-center block transition-all ${active || pending ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-200 text-slate-500 hover:bg-slate-300'}`}
                                >
                                    {m.linkText}
                                </a>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}
