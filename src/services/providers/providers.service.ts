import { CategoryProvider } from 'interfaces/CategoryProvider';
import { Provider } from 'interfaces/Provider';
import { alert } from 'utils/alert';
import { db } from '../../db';

export const list = async () => {
  const providers = await db.providers.toArray();

  await Promise.all(
    providers.map(async (provider) => {
      [provider.city] = await Promise.all([db.cities.get(provider.cityId)]);
      // [provider.city?.state] = await Promise.all([
      //   db.states.get(provider.city?.stateId),
      // ]);
      [provider.companySize] = await Promise.all([
        db.companiesSize.get(provider.companySizeId),
      ]);
    })
  );

  return providers;
};

export const save = async (provider: Provider) => {
  try {
    const id = await db.providers.add(provider);

    // TODO: allow save only distinct categories
    const categoryProviders = provider.categories.map((c) => ({
      categoryId: Number(id),
      providerId: c.id,
    })) as CategoryProvider[];

    await db.categoryProvider.bulkAdd(categoryProviders);

    alert.success('Novo fornecedor salvo com sucesso!');
  } catch {
    alert.error('Ocorreu um erro ao salvar! Tente novamente!');
  }
};

export const update = async (id: number, provider: Provider) => {
  await db.providers.update(id, provider);
};

export const remove = async (id: number) => {
  await db.providers.delete(id);
};
