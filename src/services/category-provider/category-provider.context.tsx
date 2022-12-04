import React, { useState, createContext } from 'react';

import { CategoryProvider } from 'interfaces/CategoryProvider';
import { listByProvider } from './category-provider.service';

interface CategoriesProviderContextProps {
  categoriesProvider: CategoryProvider[];
  getCategoryProviderByProviderId: (providerId: number) => Promise<void>;
}

export const CategoriesProviderContext = createContext(
  {} as CategoriesProviderContextProps
);

interface PropviderProps {
  children: React.ReactNode;
}

export const CateogiesProviderContextProvider = ({
  children,
}: PropviderProps) => {
  const [categoriesProvider, setCategoriesProvider] = useState<
    CategoryProvider[]
  >([]);

  const getCategoryProviderByProviderId = async (providerId: number) => {
    const response = await listByProvider(providerId);

    setCategoriesProvider(response);
  };

  return (
    <CategoriesProviderContext.Provider
      value={{
        categoriesProvider,
        getCategoryProviderByProviderId,
      }}
    >
      {children}
    </CategoriesProviderContext.Provider>
  );
};
