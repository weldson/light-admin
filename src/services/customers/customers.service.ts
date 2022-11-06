import { Customer } from 'interfaces/Customer';
import { db } from '../../db';

export const list = async () => {
  const customers = await db.customers.toArray();

  return customers;
};

export const save = async (customer: Customer) => {
  await db.customers.add(customer);
};

export const update = async (id: number, customer: Customer) => {
  await db.customers.update(id, customer);
};

export const remove = async (id: number) => {
  await db.customers.delete(id);
};
