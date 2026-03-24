import { DashboardShell } from "@/components/dashboard-shell";
import { auth } from '../../../auth';

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role || 'CLIENT';

    return (
        <DashboardShell role={role}>
            {children}
        </DashboardShell>
    );
}
