import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-card';
import { Settings } from 'lucide-react';

export default function ConfigPage() {
    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Settings className="text-blue-600" />
                    AI Integrations
                </h1>
                <p className="text-gray-500 mt-1">Manage your active SaaS bundles and customize their behavior.</p>
            </div>

            <Card className="max-w-xl">
                <CardHeader>
                    <CardTitle>Select a Bundle</CardTitle>
                    <CardDescription>
                        To configure your custom system prompts, knowledge bases, and API connections, please select one of your Active subscription bundles from the sidebar menu (e.g., Bazz-Connect).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        Once a bundle is fully activated via M-Pesa, you'll be able to inject its specific "AI Brain" directly into the centralized n8n engine.
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
