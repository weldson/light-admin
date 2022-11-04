import React, { createContext, useEffect, useState } from 'react';
import { Order } from 'interfaces/Order';
import { listOrders } from './orders.service';

interface OrdersContextProps {
  orders: Order[];
  updateOrders: () => Promise<void>;
}

export const OrdersContext = createContext({} as OrdersContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const OrdersContextProvider = ({ children }: ProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const updateOrders = async (): Promise<void> => {
    const response = await listOrders();

    setOrders(response);
  };

  useEffect(() => {
    updateOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        updateOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
