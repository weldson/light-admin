import React, { createContext, useEffect, useState } from 'react';
import { Bag } from 'interfaces/Bag';
import { list, remove, save, update } from './bags.service';

interface BagsContextProps {
  bags: Bag[];
  createBag: (bag: Bag) => Promise<void>;
  updateBag: (id: number, bag: Bag) => Promise<void>;
  removeBag: (id: number) => Promise<void>;
}

export const BagsContext = createContext({} as BagsContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const BagsContextProvider = ({ children }: ProviderProps) => {
  const [bags, setBags] = useState<Bag[]>([]);

  const updateBags = async (): Promise<void> => {
    const response = await list();

    setBags(response);
  };

  const createBag = async (bag: Bag): Promise<void> => {
    await save(bag);
    await updateBags();
  };

  const updateBag = async (id: number, bag: Bag): Promise<void> => {
    await update(id, bag);
    await updateBags();
  };

  const removeBag = async (id: number): Promise<void> => {
    await remove(id);
    await updateBags();
  };

  useEffect(() => {
    updateBags();
  }, []);

  return (
    <BagsContext.Provider
      value={{
        bags,
        createBag,
        updateBag,
        removeBag,
      }}
    >
      {children}
    </BagsContext.Provider>
  );
};
