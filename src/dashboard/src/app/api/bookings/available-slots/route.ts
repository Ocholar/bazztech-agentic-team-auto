import { NextResponse } from 'next/server';
import { addDays, setHours, setMinutes, isWeekend, startOfToday, formatISO } from 'date-fns';

export async function GET() {
    try {
        // In a full production build, this would fetch busy slots from the Google Calendar API
        // For the enterprise MVP, we generate structural deterministic slots
        const availableSlots = [];
        let cursor = addDays(startOfToday(), 1); // Start from tomorrow

        // Generate next 14 valid business days
        let daysAdded = 0;
        while (daysAdded < 14) {
            if (!isWeekend(cursor)) {
                // Two VIP specific slots for assessments daily (10:00 AM EAT, 2:00 PM EAT)
                // Using UTC adjustments (-3 hours from EAT) -> 07:00 UTC and 11:00 UTC
                const morningSlot = formatISO(setMinutes(setHours(cursor, 7), 0));
                const afternoonSlot = formatISO(setMinutes(setHours(cursor, 11), 0));

                availableSlots.push(morningSlot, afternoonSlot);
                daysAdded++;
            }
            cursor = addDays(cursor, 1);
        }

        return NextResponse.json({ slots: availableSlots });
    } catch (error) {
        console.error('Failed to fetch available slots:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
