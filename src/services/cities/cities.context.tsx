import React, { createContext, useEffect, useState } from 'react';

import { City } from 'interfaces/City';
import { list, remove, save, update, getByStateId } from './cities.service';

interface CitiesContextProps {
  cities: City[];
  createCity: (city: City) => Promise<void>;
  updateCity: (id: number, city: City) => Promise<void>;
  removeCity: (id: number) => Promise<void>;
  filterCities: (stateId: number) => Promise<void>;
}

export const CitiesContext = createContext({} as CitiesContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CitiesContextProvider = ({ children }: ProviderProps) => {
  const [cities, setCities] = useState<City[]>([]);

  const updateCities = async (): Promise<void> => {
    const response = await list();

    setCities(response);
  };

  const filterCities = async (stateId: number): Promise<void> => {
    const response = await getByStateId(stateId);

    setCities(response);
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
        filterCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
