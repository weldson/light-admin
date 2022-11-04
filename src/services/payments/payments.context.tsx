import React, { useState, createContext, useEffect } from 'react';

import { Payment } from 'interfaces/Payment';

import { listPayments } from './payments.service';

interface PaymentsContextProps {
  payments: Payment[];
  updatePayments: () => Promise<void>;
}

export const PaymentsContext = createContext({} as PaymentsContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const PaymentsContextProvider = ({ children }: ProviderProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const updatePayments = async () => {
    const response = await listPayments();

    setPayments(response);
  };

  useEffect(() => {
    updatePayments();
  }, []);

  return (
    <PaymentsContext.Provider value={{ payments, updatePayments }}>
      {children}
    </PaymentsContext.Provider>
  );
};
