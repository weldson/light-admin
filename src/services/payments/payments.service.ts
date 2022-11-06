import { Payment } from 'interfaces/Payment';
import { db } from '../../db';

export const list = async () => {
  const payments = await db.payments.toArray();

  return payments;
};

export const save = async (payment: Payment) => {
  await db.payments.add(payment);
};

export const update = async (id: number, payment: Payment) => {
  await db.payments.update(id, payment);
};

export const remove = async (id: number) => {
  await db.payments.delete(id);
};
