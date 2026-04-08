import { auth } from '../../../../../auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui-card";
import { Settings, Webhook, AlertCircle, Calendar, Bot } from "lucide-react";
import { saveProductConfig, saveApiKeys, createPendingSubscription } from '../actions';
import { PaymentVerification } from '@/components/payment-verification';
import { TestAgentButton } from '@/components/test-agent-button';

export default async function BazzLeadConfig() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    const isAdmin = (session.user as any)?.role === 'ADMIN' || user?.role === 'ADMIN' || session.user.email === 'reaochola@gmail.com';

    const sub = await db.subscription.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_LEAD' }
    });

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id, productType: 'BAZZ_LEAD' }
    });

    const isActive = isAdmin || sub?.status === 'ACTIVE';
    const amount = sub?.oneTimeFee || 4999;

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50">
            <div className="mb-8 flex items-center justify-between border-b pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
                        <Settings className="text-orange-600" size={32} />
                        Bazz-Lead CRM Agent
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Configure lead qualification rules and meeting scheduling"
                            : "Activate your AI Sales Rep via Equity Bank Jenga API"}
                    </p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* --- PAYMENT VERIFICATION --- */}
                {!isActive && sub ? (
                    <div className="md:col-span-1 lg:col-span-1 space-y-4">
                        <PaymentVerification
                            subscriptionId={sub.id}
                            productName="Bazz-Lead"
                            amount={amount}
                            status={sub.status as any}
                            expiresAt={sub.expiresAt?.toISOString()}
                        />
                    </div>
                ) : !isActive ? (
                    <div className="md:col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                            <AlertCircle size={16} />
                            No Subscription Found. Return to Hub to subscribe.
                        </div>
                    </div>
                ) : (
                    <></>
                )}

                {/* --- CONFIGURATION PORTAL --- */}
                {isActive && (
                    <div className="md:col-span-2 lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>1. AI Nurturing & Qualification Rules</CardTitle>
                                <CardDescription>How should the AI nurture raw prospects into qualified leads?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={saveProductConfig} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">BANT Framework Rules (Budget, Authority, Need, Time)</label>
                                        <textarea
                                            name="systemPrompt"
                                            rows={6}
                                            className="flex w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-orange-600"
                                            defaultValue={config?.systemPrompt || `You are the BazzAI Senior Sales Representative. You monitor social DMs and leads. Use the BANT framework:
1. Budget: Is the project budget over $2,500 (KES 250,000)?
2. Authority: Are you speaking to the CEO, CTO, or Operations Manager?
3. Need: Do they have a manual process (WhatsApp, ERP, Documents) they want to automate with an Agentic Swarm?
4. Time: Do they want to deploy within 30 days?

Tone: Sophisticated, efficient, and premium. If BANT is qualified, offer the Strategy Call link.`}
                                        />
                                    </div>
                                    <div className="flex justify-end pt-4 border-t">
                                        <button className="bg-orange-600 text-white px-8 py-2 rounded-md font-bold hover:bg-orange-700 transition flex items-center gap-2">
                                            <Bot size={16} /> Save CRM Agent Memory
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>2. Meeting Scheduling & Pipeline Mgmt</CardTitle>
                                <CardDescription>How does the AI hand the conversation over to a human closer?</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={saveApiKeys} className="space-y-4">
                                    <input type="hidden" name="configId" value={config?.id || ""} />
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Calendly / Booking Link</label>
                                        <input type="text" name="whatsappUrl" defaultValue={config?.whatsappUrl || ""} placeholder="https://calendly.com/your-business/30min" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600" />
                                        <p className="text-[11px] text-gray-500">The AI answers questions and ONLY offers this link to Hot/Qualified leads. (Need one? <a href="https://calendly.com/signup" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">Get a free Calendly account here</a>).</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">CRM Pipeline Sync URL</label>
                                        <input type="text" name="crmWebhookUrl" defaultValue={config?.crmWebhookUrl || ""} placeholder="https://api.hubapi.com/crm/v3/objects/contacts" className="flex h-10 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-600" />
                                        <p className="text-[11px] text-gray-500">Bazz-Lead will instantly structure and post qualified profiles straight to your external pipeline.</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t gap-4">
                                        <div className="flex-1">
                                            <TestAgentButton />
                                        </div>
                                        <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg">
                                            Save All Settings
                                        </button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* --- ACTIVE WEBHOOK CONNECTION CARD --- */}
                {isActive && (
                    <div className="md:col-span-1 lg:col-span-1 space-y-6">
                        <Card className="bg-slate-900 border-none text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Webhook size={20} className="text-orange-400" />
                                    1. Lead Ingress
                                </CardTitle>
                                <CardDescription className="text-slate-400">
                                    Instagram/Facebook Webhook
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Lead Source URL</p>
                                    <code className="block w-full bg-slate-950 text-orange-400 p-3 rounded font-mono text-[10px] break-all">
                                        https://tentacled-goldfish.pikapod.net/webhook/ig-lead-{session.user.id.substring(0, 8)}
                                    </code>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </main>
    );
}
