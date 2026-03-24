import { auth } from '@/auth';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Settings, Bot, Database, Zap, CheckCircle2 } from 'lucide-react';
import { saveProductConfig } from './actions';
import { redirect } from 'next/navigation';

export default async function ConfigPage() {
    const session = await auth();
    if (!session || !session.user) redirect('/login');

    const config = await db.productConfig.findFirst({
        where: { userId: session.user.id }
    });

    const activeSub = await db.subscription.findFirst({
        where: { userId: session.user.id, status: 'ACTIVE' }
    });

    return (
        <main className="flex min-h-screen flex-col p-4 md:p-8 bg-gray-50 dark:bg-zinc-900">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Settings className="text-red-600" />
                    Configure Your AI Brain
                </h1>
                <p className="text-gray-500 mt-1">Personalize how your AI agent represents your business.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="text-red-600" size={20} />
                                Personality & Instructions
                            </CardTitle>
                            <CardDescription>
                                Describe your business, your tone of voice, and any specific rules the AI should follow.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form action={saveProductConfig} className="space-y-6">
                                <input type="hidden" name="configId" value={config?.id || ""} />
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">System Prompt</label>
                                    <textarea 
                                        name="systemPrompt" 
                                        className="w-full h-48 p-4 rounded-xl border border-slate-200 bg-white font-mono text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="e.g. You are a helpful sales assistant for 'BazzAI Networks'. You speak in a professional yet friendly Kenyan tone. Mention that we offer AI automation for local businesses..."
                                        defaultValue={config?.systemPrompt || ""}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Knowledge Base (Raw Context)</label>
                                    <textarea 
                                        name="knowledgeBase" 
                                        className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        placeholder="Paste your product list, prices, or FAQs here..."
                                        defaultValue={config?.knowledgeBase || ""}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                                >
                                    <Zap size={18} />
                                    Synchronize with n8n Brain
                                </button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Subscription Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {activeSub ? (
                                <div className="flex items-center gap-3 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100">
                                    <CheckCircle2 size={18} />
                                    <span className="text-sm font-bold">Active: {activeSub.productType}</span>
                                </div>
                            ) : (
                                <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm font-bold">
                                    No Active Subscriptions Found
                                </div>
                            )}
                            
                            <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-lg border border-slate-200">
                                <p className="font-bold mb-1">Webhook Routing ID:</p>
                                <code className="block break-all bg-slate-200 p-1 rounded mt-1">{config?.webhookId || "Pending Activation..."}</code>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-900 border-none text-white shadow-2xl shadow-red-500/10">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Database size={18} className="text-red-500" />
                                Test Connectivity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-400 mb-6 font-medium">
                                Once saved, you can trigger a test message to ensure your n8n workflows are receiving your custom business logic.
                            </p>
                            
                            <TestWorkflowButton />

                            <div className="mt-6 pt-6 border-t border-white/10 text-[10px] text-slate-500 flex items-center gap-2 italic">
                                <Bot size={12} />
                                Master n8n Workflow will pull your latest config instantly.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
