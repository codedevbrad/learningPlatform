// app/payments/PaymentStep.tsx
'use client';

import { useState, useTransition } from 'react';
import { create30DaySubscription } from "../../queries/queries.student"
import { Button } from '@/components/ui/button';

interface PaymentStepProps {
  onPaymentComplete: () => void
}

export default function PaymentStep({ onPaymentComplete }: PaymentStepProps) {
  // We'll track error messages in local state
  const [error, setError] = useState<string | null>(null);

  // useTransition for a non-blocking UI while the action runs
  const [isPending, startTransition] = useTransition();

  async function completePayment() {
    setError(null);
    // Start a transition so the UI can remain responsive
    startTransition(async () => {
      try {
        
        await create30DaySubscription();
        onPaymentComplete();
        // If successful, do something (e.g. navigate away, show success, etc.)
      } catch (err: any) {
        // If the server action threw, we catch it here
        setError(err.message || 'Error completing payment');
      }
    });
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <Button onClick={completePayment} disabled={isPending}>
        {isPending ? 'Processing...' : 'Complete Payment'}
      </Button>
    </div>
  );
}
