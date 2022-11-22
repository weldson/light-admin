import React, { useState, createContext, useEffect } from 'react';

import { Provider } from 'interfaces/Provider';
import { list, save, update, remove } from './providers.service';

interface ProvidersContextProps {
  providers: Provider[];
  createProvider: (provider: Provider) => Promise<void>;
  updateProvider: (id: number, provider: Provider) => Promise<void>;
  removeProvider: (id: number) => Promise<void>;
}

export const ProvidersContext = createContext({} as ProvidersContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const ProvidersContextProvider = ({ children }: ProviderProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const updateProviders = async () => {
    const response = await list();

    setProviders(response);
  };

  const createProvider = async (provider: Provider) => {
    await save(provider);
    await updateProviders();
  };

  const updateProvider = async (id: number, provider: Provider) => {
    await update(id, provider);
    await updateProviders();
  };

  const removeProvider = async (id: number) => {
    await remove(id);
    await updateProviders();
  };

  useEffect(() => {
    updateProviders();
  }, []);

  return (
    <ProvidersContext.Provider
      value={{
        providers,
        createProvider,
        updateProvider,
        removeProvider,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};
