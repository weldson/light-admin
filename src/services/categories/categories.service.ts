import { db } from '../../db';

export const listCategories = async () => {
  const categories = await db.categories.toArray();
  console.log(categories);
  return categories;
};

export const addCategory = async (name: string) => {
  const id = await db.categories.add({ name });

  return id;
};

export const updateCategory = async (id: number, name: string) => {
  await db.categories.update(id, { name });
};

export const removeCategory = async (id: number) => {
  await db.categories.delete(id);
};
