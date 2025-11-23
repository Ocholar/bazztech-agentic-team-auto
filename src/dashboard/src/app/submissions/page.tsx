import { getSubmissions } from '../actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-card';

export default async function SubmissionsPage() {
    const submissions = await getSubmissions();

    return (
        <main className="flex min-h-screen flex-col p-8 bg-gray-50 dark:bg-zinc-900">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Submissions</h1>
                <p className="text-gray-500">History of automated form submissions to Airtel.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Submission Log</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Lead Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Response</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {submissions.map((sub) => (
                                    <tr key={sub.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle">{sub.createdAt.toLocaleString()}</td>
                                        <td className="p-4 align-middle font-medium">{sub.lead.name}</td>
                                        <td className="p-4 align-middle">{sub.lead.phone}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${sub.status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle max-w-xs truncate text-xs font-mono text-muted-foreground">
                                            {sub.response}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
