import { DashboardShell } from "@/components/dashboard-shell";
import { auth } from '../../../auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role || 'ADMIN';

    return (
        <DashboardShell bannerText="Bazztech Admin Control Tower" role={role}>
            {children}
        </DashboardShell>
    );
}
