import React, { useState, createContext, useEffect } from 'react';

import { Customer } from 'interfaces/Customer';

import { list, save, update, remove } from './customers.service';

interface CustomerContextProps {
  customers: Customer[];
  createCustomer: (customer: Customer) => Promise<void>;
  updateCustomer: (id: number, customer: Customer) => Promise<void>;
  removeCustomer: (id: number) => Promise<void>;
}

export const CustomersContext = createContext({} as CustomerContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CustomersContextProvider = ({ children }: ProviderProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const updateCustomers = async () => {
    const response = await list();

    setCustomers(response);
  };

  const createCustomer = async (customer: Customer) => {
    await save(customer);
    await updateCustomers();
  };

  const updateCustomer = async (id: number, customer: Customer) => {
    await update(id, customer);
    await updateCustomers();
  };

  const removeCustomer = async (id: number) => {
    await remove(id);
    await updateCustomers();
  };

  useEffect(() => {
    updateCustomers();
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        createCustomer,
        updateCustomer,
        removeCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
