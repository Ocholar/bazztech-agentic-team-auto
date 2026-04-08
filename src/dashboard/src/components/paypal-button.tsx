"use client";

import { useEffect, useRef } from 'react';

interface PayPalButtonProps {
    hostedButtonId: string;
    clientId: string;
    amount?: string;
    quantity?: number;
    onSuccess?: (order: any) => void;
}

export default function PayPalButton({ hostedButtonId, clientId, amount, quantity, onSuccess }: PayPalButtonProps) {
    const containerId = `paypal-container-${hostedButtonId}`;
    const initialized = useRef(false);

    useEffect(() => {
        // Prevent multiple initializations
        if (initialized.current) return;

        // Create script if it doesn't exist
        const scriptId = 'paypal-sdk-hosted-buttons';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const loadButton = () => {
            if ((window as any).paypal?.Buttons) {
                (window as any).paypal.Buttons({
                    style: {
                        shape: 'pill',
                        color: 'gold',
                        layout: 'vertical',
                        label: 'pay',
                    },
                    createOrder: (data: any, actions: any) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                    currency_code: 'USD',
                                    value: amount || '49.99'
                                },
                                description: `BazzAI: Global Enterprise Automation (${quantity || 1} Slot${(quantity || 1) > 1 ? 's' : ''})`
                            }]
                        });
                    },
                    onApprove: async (data: any, actions: any) => {
                        const order = await actions.order.capture();
                        console.log('Capture result', order);
                        if (onSuccess) {
                            onSuccess(order);
                        } else {
                            window.location.href = '/portal?payment=success&orderId=' + order.id;
                        }
                    }
                }).render(`#${containerId}`);
                initialized.current = true;
            }
        };

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
            script.async = true;
            script.onload = loadButton;
            document.head.appendChild(script);
        } else {
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
