import { Product } from 'interfaces/Product';
import { db } from '../../db';

export const list = async () => {
  const products = await db.products.toArray();

  // await Promise.all(
  //   products.map(async (product) => {
  //     [product.category, product.provider] = await Promise.all([
  //       db.categories.get(product.categoryId),
  //       db.providers.get(product.providerId),
  //     ]);
  //   })
  // );

  return products;
};

export const save = async (product: Product) => {
  const id = await db.products.add(product);

  return id;
};

export const update = async (id: number, product: Product) => {
  await db.products.update(id, product);
};

export const remove = async (id: number) => {
  await db.products.delete(id);
};
