import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui-card";
import { MessageSquare, Save, Webhook } from "lucide-react";

export default function BazzConnectConfig() {
    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-3">
                        <MessageSquare className="text-red-600" size={32} />
                        Configure Bazz-Connect
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Customize your WhatsApp AI FrontDesk Agent</p>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Left Column: Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Agent Persona & Prompt</CardTitle>
                            <CardDescription>
                                Define exactly how your AI agent should behave, respond, and represent your business.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Business Name / Agent Name</label>
                                <input
                                    type="text"
                                    defaultValue="Demo Real Estate Bot"
                                    className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 dark:bg-zinc-950 dark:border-zinc-800"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">System Prompt (The Brain)</label>
                                <textarea
                                    rows={8}
                                    defaultValue="You are a helpful customer service agent for Demo Real Estate. Be polite, concise, and try to capture the leads email address before answering detailed pricing questions."
                                    className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 dark:bg-zinc-950 dark:border-zinc-800"
                                />
                                <p className="text-xs text-slate-500">This instruction is injected directly into the LLM for every message.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Knowledge Base</CardTitle>
                            <CardDescription>
                                Provide the specific facts, pricing details, and FAQs the agent needs to know.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <textarea
                                    rows={10}
                                    defaultValue="1. Our office is located at Westlands, Nairobi. \n2. 2-Bedroom pricing starts at KES 50,000/month. \n3. We only do long-term leases (minimum 12 months)."
                                    className="flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 dark:bg-zinc-950 dark:border-zinc-800"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end border-t border-slate-100 pt-6">
                            <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors shadow-sm">
                                <Save size={18} />
                                Save Configuration
                            </button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Right Column: Connection Info */}
                <div className="space-y-6">
                    <Card className="bg-slate-900 border-none text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Webhook size={20} className="text-red-400" />
                                Webhook Integration
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                                Connection details for your central Bazz AI Engine.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Your Webhook ID</p>
                                <code className="block w-full bg-slate-950 text-red-400 p-3 rounded text-xs break-all">
                                    whk_9a8b7c6d5e4f3g2h1
                                </code>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-medium">Ready for Traffic</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                        <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
                        <p className="text-sm text-blue-800 mb-3">
                            1. When your customers message your WhatsApp number, the Bazz AI Master Engine receives it.
                        </p>
                        <p className="text-sm text-blue-800 mb-3">
                            2. The engine instantly pulls your unique System Prompt and Knowledge Base from this page.
                        </p>
                        <p className="text-sm text-blue-800">
                            3. The AI agent responds perfectly tailored to your business rules!
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
