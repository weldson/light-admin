import { City } from 'interfaces/City';
import { db } from 'db';
import { alert } from 'utils/alert';

export const list = async () => {
  const cities = await db.cities.toArray();

  await Promise.all(
    cities.map(async (city) => {
      [city.state] = await Promise.all([db.states.get(city.stateId)]);
    })
  );

  return cities;
};

export const save = async (city: City) => {
  const cityExists = await db.cities.get({
    name: city.name,
    stateId: city.stateId,
  });

  if (cityExists) {
    alert.error('O estado selecionado já possui uma cidade com este nome!');
    return;
  }

  await db.cities.add(city);
  alert.success('Cidade adicionada com sucesso!');
};

export const update = async (id: number, city: City) => {
  await db.cities.update(id, city);
};

export const remove = async (id: number) => {
  const providerInCity = await db.providers.get({ cityId: id });

  if (providerInCity) {
    alert.error('Existe um fornecedor nesta cidade!');
    return;
  }
  await db.cities.delete(id);
  alert.success('Cidade removida com sucesso!');
};
