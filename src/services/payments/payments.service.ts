import { Payment } from 'interfaces/Payment';
import { db } from '../../db';

export const listPayments = async () => {
  const payments = await db.payments.toArray();

  return payments;
};

export const storePayment = async (payment: Payment) => {
  const id = await db.payments.add(payment);

  return id;
};
