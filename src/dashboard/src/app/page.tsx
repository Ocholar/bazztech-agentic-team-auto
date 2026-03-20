import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-card';
import { Bot, MessageSquare, FileText, Zap, Settings, Activity, ArrowRight, Users } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Temporary mock data until we rewrite actions.ts to pull from our new Prisma SaaS schema
  const userStats = {
    activeAgents: 2,
    totalConversations: 1245,
    leadsGenerated: 48,
    systemUptime: '99.9%'
  };

  const activeSubscriptions = [
    { id: 'sub-1', product: 'Bazz-Connect', status: 'ACTIVE', lastActive: '2 mins ago' },
    { id: 'sub-2', product: 'Bazz-Lead', status: 'ACTIVE', lastActive: '1 hr ago' }
  ];

  return (
    <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Client Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your Bazz AI Agentic Workflows</p>
        </div>
        <div className="text-sm text-gray-500 font-medium">Logged in as: Demo Client</div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.activeAgents} / 4</div>
            <p className="text-xs text-muted-foreground">Deployed Workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalConversations}</div>
            <p className="text-xs text-muted-foreground">Across all channels</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Captured</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.leadsGenerated}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Zap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">n8n Orchestration</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Catalog / Active Subscriptions */}
      <div className="mb-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">Your AI Automations</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {/* Bazz-Connect */}
        <Card className="border-red-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-2">
              <MessageSquare size={20} />
            </div>
            <CardTitle>Bazz-Connect</CardTitle>
            <CardDescription>WhatsApp FrontDesk Bot</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
              Active
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/config/bazz-connect" className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              <Settings size={16} /> Configure Prompt
            </Link>
          </CardFooter>
        </Card>

        {/* Bazz-Flow */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-2">
              <Zap size={20} />
            </div>
            <CardTitle>Bazz-Flow</CardTitle>
            <CardDescription>Equity Bank Payment Sync</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              Unsubscribed
            </span>
          </CardContent>
          <CardFooter>
            <button disabled className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400">
              Upgrade to Access
            </button>
          </CardFooter>
        </Card>

        {/* Bazz-Doc */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center mb-2">
              <FileText size={20} />
            </div>
            <CardTitle>Bazz-Doc</CardTitle>
            <CardDescription>AI Document Extraction</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
              Unsubscribed
            </span>
          </CardContent>
          <CardFooter>
            <button disabled className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-400">
              Upgrade to Access
            </button>
          </CardFooter>
        </Card>

        {/* Bazz-Lead */}
        <Card className="border-red-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-2">
              <Users size={20} />
            </div>
            <CardTitle>Bazz-Lead</CardTitle>
            <CardDescription>Autonomous CRM Agent</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
              Active
            </span>
          </CardContent>
          <CardFooter>
            <Link href="/crm" className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-white border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              View Pipeline <ArrowRight size={16} />
            </Link>
          </CardFooter>
        </Card>
      </div>

    </main>
  );
}
