import { Sidebar } from "@/components/sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-y-auto bg-red-50/30 dark:bg-zinc-950">
                <div className="border-b bg-red-600 px-8 py-2 text-xs font-bold uppercase tracking-widest text-white text-center">
                    Bazztech Admin Control Tower
                </div>
                {children}
            </div>
        </div>
    );
}
