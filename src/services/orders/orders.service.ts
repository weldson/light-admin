import { db } from '../../db';

export const listOrders = async () => {
  const orders = await db.orders.toArray();

  return orders;
};
