import { Bag } from 'interfaces/Bag';
import { db } from '../../db';

export const listBags = async () => {
  const bags = await db.bags.toArray();

  return bags;
};
