import { Customer } from 'interfaces/Customer';
import { db } from '../../db';

export const listCustomers = async () => {
  const customers = await db.customers.toArray();

  return customers;
};

export const addCustomers = async (customer: Customer) => {
  const id = await db.customers.add(customer);

  return id;
};

export const updateCustomers = async (id: number, customer: Customer) => {
  await db.customers.update(id, customer);
};

export const removeCustomers = async (id: number) => {
  await db.customers.delete(id);
};
