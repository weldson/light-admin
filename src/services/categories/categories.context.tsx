import React, { useState, createContext, useEffect } from 'react';
import { Category } from 'interfaces/Category';
import { list, save, update, remove } from './categories.service';

interface CategoriesContextProps {
  categories: Category[];
  createCategory: (category: Category) => Promise<void>;
  updateCategory: (id: number, category: Category) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
}

export const CategoriesContext = createContext({} as CategoriesContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const CategoriesContextProvider = ({ children }: ProviderProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const updateCategories = async () => {
    const response = await list();
    setCategories(response);
  };

  const createCategory = async (category: Category) => {
    await save(category);
    await updateCategories();
  };

  const updateCategory = async (id: number, category: Category) => {
    await update(id, category);
    await updateCategories();
  };

  const removeCategory = async (id: number) => {
    await remove(id);
    await updateCategories();
  };

  useEffect(() => {
    updateCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        createCategory,
        updateCategory,
        removeCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};
