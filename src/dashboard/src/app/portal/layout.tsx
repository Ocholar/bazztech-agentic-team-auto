import { Sidebar } from "@/components/sidebar";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-zinc-900">
                {children}
            </div>
        </div>
    );
}
