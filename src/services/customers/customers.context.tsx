import { Customer } from 'interfaces/Customer';
import React, { useState, createContext, useEffect } from 'react';
import { listCustomers } from './customers.service';

interface CustomerContextProps {
  customers: Customer[];
  updateCustomers: () => Promise<void>;
}

export const CustomersContext = createContext({} as CustomerContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CustomersContextProvider = ({ children }: ProviderProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const updateCustomers = async () => {
    const response = await listCustomers();

    setCustomers(response);
  };

  useEffect(() => {
    updateCustomers();
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        updateCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
