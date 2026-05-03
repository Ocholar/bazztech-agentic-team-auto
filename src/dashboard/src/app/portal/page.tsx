import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export default async function PortalDashboard() {
    const session = await auth();

    if (!session || !session.user) {
        redirect('/login');
    }

    redirect('/portal/overview');
}

