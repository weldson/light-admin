import { Order } from 'interfaces/Order';
import { OrderProduct } from 'interfaces/OrderProduct';
import { alert } from 'utils/alert';
import { db } from '../../db';

export const list = async () => {
  const orders = await db.orders.toArray();

  return orders;
};

export const save = async (order: Order) => {
  const id = await db.orders.add(order);

  const orderProducts = order.products?.map((p) => ({
    productId: p.id,
    orderId: Number(id),
  })) as OrderProduct[];

  await db.orderProduct.bulkAdd(orderProducts);

  alert.success('Nova venda salva com sucesso!');
};

export const update = async (id: number, order: Order) => {
  await db.orders.update(id, order);
};

export const remove = async (id: number) => {
  // TODO: remove orderProducts then order
};
