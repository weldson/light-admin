import { City } from 'interfaces/City';
import { db } from 'db';

export const listCities = async () => {
  const cities = await db.cities.toArray();

  return cities;
};
