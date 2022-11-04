import React, { createContext, useEffect, useState } from 'react';
import { Bag } from 'interfaces/Bag';
import { listBags } from './bags.service';

interface BagsContextProps {
  bags: Bag[];
  updateBags: () => Promise<void>;
}

export const BagsContext = createContext({} as BagsContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const BagsContextProvider = ({ children }: ProviderProps) => {
  const [bags, setBags] = useState<Bag[]>([]);

  const updateBags = async (): Promise<void> => {
    const response = await listBags();

    setBags(response);
  };

  useEffect(() => {
    updateBags();
  }, []);

  return (
    <BagsContext.Provider
      value={{
        bags,
        updateBags,
      }}
    >
      {children}
    </BagsContext.Provider>
  );
};
