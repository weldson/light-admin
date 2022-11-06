import { Bag } from 'interfaces/Bag';
import { db } from '../../db';

export const list = async () => {
  const bags = await db.bags.toArray();

  return bags;
};

export const save = async (bag: Bag) => {
  await db.bags.add(bag);
};

export const update = async (id: number, bag: Bag) => {
  await db.bags.update(id, bag);
};

export const remove = async (id: number) => {
  await db.bags.delete(id);
};
