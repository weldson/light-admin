import React, { useState, createContext, useEffect } from 'react';
import { Category } from 'interfaces/Category';
import { listCategories } from './categories.service';

interface CategoriesContextProps {
  categories: Category[];
  updateCategories(): Promise<void>;
}

export const CategoriesContext = createContext({} as CategoriesContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CategoriesContextProvider = ({ children }: ProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const updateCategories = async () => {
    const response = await listCategories();
    setCategories(response);
  };

  useEffect(() => {
    updateCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        updateCategories,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
