import { Provider } from 'interfaces/Provider';
import { db } from '../../db';

export const list = async () => {
  const providers = await db.providers.toArray();

  return providers;
};

export const save = async (provider: Provider) => {
  await db.providers.add(provider);
};

export const update = async (id: number, provider: Provider) => {
  await db.providers.update(id, provider);
};

export const remove = async (id: number) => {
  await db.providers.delete(id);
};
