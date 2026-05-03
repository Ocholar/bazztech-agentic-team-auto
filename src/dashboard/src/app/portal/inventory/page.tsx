import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-card';
import { Box, AlertCircle, ShoppingCart, ArrowDown, ArrowUp, BarChart3 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function InventoryPage() {
    const session = await auth();
    if (!session) redirect('/login');

    const items = [
        { id: 'i1', name: 'Kraft Paper Roll (150gsm)', stock: 4200, unit: 'kg', threshold: 1000, trend: 'decreasing', status: 'LOW' },
        { id: 'i2', name: 'Maize Flour (Primary)', stock: 12500, unit: 'kg', threshold: 5000, trend: 'stable', status: 'OK' },
        { id: 'i3', name: 'Industrial Adhesive', stock: 85, unit: 'L', threshold: 100, trend: 'decreasing', status: 'CRITICAL' },
        { id: 'i4', name: 'Spare Bearings (XJ-9)', stock: 12, unit: 'pcs', threshold: 5, trend: 'stable', status: 'OK' },
    ];

    return (
        <div className="p-6 md:p-10 bg-slate-50/50 min-h-screen">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory & Forecasting</h1>
                    <p className="text-slate-500 mt-1">Manage floor stock and prevent production delays with AI forecasting.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
                        Inventory Audit
                    </button>
                    <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                        Purchase Order
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="bg-slate-50 border-b border-slate-100">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Box size={16} className="text-red-500" />
                                Current Floor Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                        <tr>
                                            <th className="px-6 py-4">Item Name</th>
                                            <th className="px-6 py-4">Current Stock</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Trend</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {items.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                                                <td className="px-6 py-4">
                                                    <span className="font-black">{item.stock}</span>
                                                    <span className="ml-1 text-[10px] text-slate-400 font-bold uppercase">{item.unit}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'CRITICAL' ? 'bg-red-50 text-red-600' :
                                                        item.status === 'LOW' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                                                        }`}>{item.status}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.trend === 'decreasing' ? <ArrowDown size={14} className="text-red-500" /> : <ArrowUp size={14} className="text-green-500" />}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="text-slate-400 hover:text-slate-900"><ShoppingCart size={16} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200 shadow-sm bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <BarChart3 size={16} className="text-[#81B29A]" />
                                AI Consumption Forecast
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 w-full flex items-end gap-2 px-2">
                                {[40, 55, 48, 62, 80, 95, 110, 85, 70, 90, 100, 120].map((h, i) => (
                                    <div key={i} className="flex-1 rounded-t bg-slate-100 relative group" style={{ height: `${h}%` }}>
                                        <div className={`absolute inset-x-0 bottom-0 rounded-t ${i > 7 ? 'bg-[#E07A5F]' : 'bg-[#81B29A]'} transition-all opacity-80 group-hover:opacity-100`} style={{ height: '70%' }} />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                                <span>Day 1</span>
                                <span className="text-[#E07A5F] font-black italic">Next 5 Days Projection</span>
                                <span>Day 12</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-red-200 border-2 bg-red-50/30 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-red-900 flex items-center gap-2">
                                <AlertCircle size={16} className="text-red-600" />
                                Stockout Warnings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-xl bg-white border border-red-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-900">Industrial Adhesive</p>
                                <p className="text-[11px] text-slate-500 mt-1">Stockout expected in <span className="text-red-600 font-bold">14 hours</span> based on current production speed.</p>
                                <button className="mt-3 w-full py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Urgent Reorder</button>
                            </div>
                            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                                <p className="text-xs font-bold text-slate-900">Kraft Paper Roll</p>
                                <p className="text-[11px] text-slate-500 mt-1">Low threshold reach. Recommend reorder within 48h to maintain safety buffer.</p>
                                <button className="mt-3 w-full py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Add to PO</button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
