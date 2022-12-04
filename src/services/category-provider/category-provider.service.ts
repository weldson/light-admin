import { db } from 'db';

export const listByProvider = async (providerId: number) => {
  const categoryProviders = await db.categoryProvider
    .where({ providerId })
    .toArray();

  await Promise.all(
    categoryProviders.map(async (cp) => {
      [cp.category] = await Promise.all([db.categories.get(cp.categoryId)]);
      [cp.provider] = await Promise.all([db.providers.get(cp.providerId)]);
    })
  );

  return categoryProviders;
};
