import { getConfig, updateConfig } from '../actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-card';

export default async function ConfigPage() {
    const config = await getConfig();

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Configuration</h1>
                <p className="text-gray-500">Manage agent parameters and system settings.</p>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updateConfig as any} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="lead_gen_allocation_high_value" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                High Value Lead Allocation (%)
                            </label>
                            <input
                                type="number"
                                id="lead_gen_allocation_high_value"
                                name="lead_gen_allocation_high_value"
                                defaultValue={config['lead_gen_allocation_high_value'] || '60'}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <p className="text-xs text-muted-foreground">
                                Percentage of leads to source from LinkedIn/Google Maps vs WhatsApp/Facebook.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="upsell_30mbps_priority" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Upsell 30Mbps Priority
                            </label>
                            <select
                                id="upsell_30mbps_priority"
                                name="upsell_30mbps_priority"
                                defaultValue={config['upsell_30mbps_priority'] || 'true'}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="true">Enabled (Aggressive)</option>
                                <option value="false">Disabled (Standard)</option>
                            </select>
                            <p className="text-xs text-muted-foreground">
                                If enabled, agents will aggressively push the 30Mbps package.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-black text-white dark:bg-white dark:text-black"
                        >
                            Save Changes
                        </button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
