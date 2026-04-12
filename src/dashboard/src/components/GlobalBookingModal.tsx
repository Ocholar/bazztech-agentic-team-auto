"use client";

import { useEffect, useState } from 'react';
import BookingModal from './BookingModal';

export default function GlobalBookingModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener('openBookingModal', handleOpen);
        return () => window.removeEventListener('openBookingModal', handleOpen);
    }, []);

    return <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
