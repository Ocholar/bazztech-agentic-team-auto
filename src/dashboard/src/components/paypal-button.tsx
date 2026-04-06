"use client";

import { useEffect, useRef } from 'react';

interface PayPalButtonProps {
    hostedButtonId: string;
    clientId: string;
}

export default function PayPalButton({ hostedButtonId, clientId }: PayPalButtonProps) {
    const containerId = `paypal-container-${hostedButtonId}`;
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent multiple initializations
        if (initialized.current) return;

        // Create script if it doesn't exist
        const scriptId = 'paypal-sdk-hosted-buttons';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const loadButton = () => {
            if ((window as any).paypal?.HostedButtons) {
                (window as any).paypal.HostedButtons({
                    hostedButtonId: hostedButtonId,
                }).render(`#${containerId}`);
                initialized.current = true;
            }
        };

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=hosted-buttons&disable-funding=venmo&currency=USD`;
            script.async = true;
            script.onload = loadButton;
            document.head.appendChild(script);
        } else {
            // Script already exists, just render if SDK is ready
            loadButton();
        }

        return () => {
            // Optional: cleanup container if needed, though HostedButtons handles re-renders poorly
            const container = document.getElementById(containerId);
            if (container) container.innerHTML = '';
            initialized.current = false;
        };
    }, [hostedButtonId, clientId, containerId]);

    return (
        <div className="w-full flex justify-center py-4">
            <div id={containerId} className="w-full max-w-sm"></div>
        </div>
    );
}
