import { Provider } from 'interfaces/Provider';
import { db } from '../../db';

export const listProviders = async () => {
  const providers = await db.providers.toArray();

  return providers;
};

export const addProvider = async (provider: Provider) => {
  const id = await db.providers.add(provider);

  return id;
};

export const updateProvider = async (id: number, provider: Provider) => {
  await db.providers.update(id, provider);
};

export const removeProvider = async (id: number) => {
  await db.providers.delete(id);
};
