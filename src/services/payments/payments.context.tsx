import React, { useState, createContext, useEffect } from 'react';

import { Payment } from 'interfaces/Payment';

import { list, remove, save, update } from './payments.service';

interface PaymentsContextProps {
  payments: Payment[];
  createPayment: (payment: Payment) => Promise<void>;
  updatePayment: (id: number, payment: Payment) => Promise<void>;
  removePayment: (id: number) => Promise<void>;
}

export const PaymentsContext = createContext({} as PaymentsContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const PaymentsContextProvider = ({ children }: ProviderProps) => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const updatePayments = async () => {
    const response = await list();

    setPayments(response);
  };

  const createPayment = async (payment: Payment) => {
    await save(payment);
    await updatePayments();
  };

  const updatePayment = async (id: number, payment: Payment) => {
    await update(id, payment);
    await updatePayments();
  };

  const removePayment = async (id: number) => {
    await remove(id);
    await updatePayments();
  };

  useEffect(() => {
    updatePayments();
  }, []);

  return (
    <PaymentsContext.Provider
      value={{ payments, createPayment, updatePayment, removePayment }}
    >
      {children}
    </PaymentsContext.Provider>
  );
};
