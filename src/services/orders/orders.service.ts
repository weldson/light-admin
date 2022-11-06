import { Order } from 'interfaces/Order';
import { db } from '../../db';

export const list = async () => {
  const orders = await db.orders.toArray();

  return orders;
};

export const save = async (order: Order) => {
  await db.orders.add(order);
};

export const update = async (id: number, order: Order) => {
  await db.orders.update(id, order);
};
