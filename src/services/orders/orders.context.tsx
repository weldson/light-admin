import React, { createContext, useEffect, useState } from 'react';
import { Order } from 'interfaces/Order';
import { list, save, update, remove } from './orders.service';

interface OrdersContextProps {
  orders: Order[];
  createOrder: (order: Order) => Promise<void>;
  updateOrder: (id: number, order: Order) => Promise<void>;
  removeOrder: (id: number) => Promise<void>;
}

export const OrdersContext = createContext({} as OrdersContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const OrdersContextProvider = ({ children }: ProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const updateOrders = async (): Promise<void> => {
    const response = await list();

    setOrders(response);
  };

  const createOrder = async (order: Order): Promise<void> => {
    await save(order);
    await updateOrders();
  };

  const updateOrder = async (id: number, order: Order): Promise<void> => {
    await update(id, order);
    await updateOrders();
  };

  const removeOrder = async (id: number): Promise<void> => {
    await remove(id);
    await updateOrders();
  };

  useEffect(() => {
    updateOrders();
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        createOrder,
        updateOrder,
        removeOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
