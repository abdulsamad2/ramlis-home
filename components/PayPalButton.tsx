"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useState } from "react";
import { getPayPalOptions } from "@/lib/paypal-config";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export default function PayPalButton({
  amount,
  onSuccess,
  onError,
  onCancel,
  disabled = false,
}: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const initialOptions = {
    ...getPayPalOptions(),
    "disable-funding": "credit,card",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
          }}
          disabled={disabled || isLoading}
          createOrder={(data, actions) => {
            setIsLoading(true);
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount.toFixed(2),
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order?.capture();
              setIsLoading(false);
              onSuccess(details);
            } catch (error) {
              setIsLoading(false);
              onError(error);
            }
          }}
          onError={(err) => {
            setIsLoading(false);
            onError(err);
          }}
          onCancel={() => {
            setIsLoading(false);
            if (onCancel) onCancel();
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}
