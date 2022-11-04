import React, { createContext, useEffect, useState } from 'react';

import { City } from 'interfaces/City';
import { listCities } from './cities.service';

interface CitiesContextProps {
  cities: City[];
  updateCities: () => Promise<void>;
}

export const CitiesContext = createContext({} as CitiesContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CitiesContextProvider = ({ children }: ProviderProps) => {
  const [cities, setBags] = useState<City[]>([]);

  const updateCities = async (): Promise<void> => {
    const response = await listCities();

    setBags(response);
  };

  useEffect(() => {
    updateCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        updateCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
