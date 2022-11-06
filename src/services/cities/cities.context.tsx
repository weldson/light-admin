import React, { createContext, useEffect, useState } from 'react';

import { City } from 'interfaces/City';
import { list, remove, save, update } from './cities.service';

interface CitiesContextProps {
  cities: City[];
  createCity: (city: City) => Promise<void>;
  updateCity: (id: number, city: City) => Promise<void>;
  removeCity: (id: number) => Promise<void>;
}

export const CitiesContext = createContext({} as CitiesContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CitiesContextProvider = ({ children }: ProviderProps) => {
  const [cities, setBags] = useState<City[]>([]);

  const updateCities = async (): Promise<void> => {
    const response = await list();

    setBags(response);
  };

  const createCity = async (city: City) => {
    await save(city);
    await updateCities();
  };

  const updateCity = async (id: number, city: City) => {
    await update(id, city);
    await updateCities();
  };

  const removeCity = async (id: number) => {
    await remove(id);
    await updateCities();
  };

  useEffect(() => {
    updateCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        createCity,
        updateCity,
        removeCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
