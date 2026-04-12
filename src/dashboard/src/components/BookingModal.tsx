"use client";

import { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Briefcase, RefreshCw, CheckCircle } from 'lucide-react';
import { logAnalyticsEvent } from '@/lib/analytics';

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [slots, setSlots] = useState<string[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');

    useEffect(() => {
        if (isOpen && slots.length === 0) {
            fetchSlots();
        }
    }, [isOpen]);

    const fetchSlots = async () => {
        setLoadingSlots(true);
        try {
            const res = await fetch('/api/bookings/available-slots');
            const data = await res.json();
            if (data.slots) setSlots(data.slots);
        } catch (error) {
            console.error("Failed to load slots");
        }
        setLoadingSlots(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/bookings/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, company, date: selectedSlot, useCase: 'Enterprise Assessment' })
            });

            if (res.ok) {
                logAnalyticsEvent('native_booking_completed', { email, company });
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    onClose();
                }, 4000);
            }
        } catch (err) {
            console.error(err);
        }
        setSubmitting(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} aria-label="Close modal" className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={24} />
                </button>

                {success ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-3xl font-black mb-2 tracking-tight">Booking Confirmed!</h3>
                        <p className="text-slate-500 font-medium">A calendar invitation is on its way to your inbox. We look forward to scaling your operations.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-50 text-red-600 mb-4">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-3xl font-black tracking-tight">AI Assessment</h3>
                            <p className="text-slate-500 font-medium text-sm mt-1">Select a 30-minute slot for your operational audit.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Name</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input required type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-sm font-bold" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company</label>
                                    <div className="relative">
                                        <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input required type="text" placeholder="Acme Inc" value={company} onChange={e => setCompany(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-sm font-bold" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Work Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input required type="email" placeholder="john@acme.com" value={email} onChange={e => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-sm font-bold" />
                                </div>
                            </div>

                            <div className="space-y-1 pt-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Slots</label>
                                {loadingSlots ? (
                                    <div className="h-12 flex items-center justify-center text-slate-400"><RefreshCw className="animate-spin" size={18} /></div>
                                ) : (
                                    <select required aria-label="Select a booking slot" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-sm font-bold appearance-none">
                                        <option value="" disabled>Select a date and time...</option>
                                        {slots.map(s => (
                                            <option key={s} value={s}>{new Date(s).toLocaleString()}</option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <button type="submit" disabled={submitting || !selectedSlot} className="w-full py-4 mt-6 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-black rounded-xl transition-colors flex justify-center items-center gap-2">
                                {submitting ? <RefreshCw className="animate-spin" size={18} /> : "Confirm Assessment Booking"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
