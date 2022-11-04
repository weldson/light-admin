import { Provider } from 'interfaces/Provider';
import React, { useState, createContext, useEffect } from 'react';
import { listProviders } from './providers.service';

interface ProvidersContextProps {
  providers: Provider[];
  updateProviders: () => Promise<void>;
}

export const ProvidersContext = createContext({} as ProvidersContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const ProvidersContextProvider = ({ children }: ProviderProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const updateProviders = async () => {
    const response = await listProviders();

    setProviders(response);
  };

  useEffect(() => {
    updateProviders();
  }, []);

  return (
    <ProvidersContext.Provider
      value={{
        providers,
        updateProviders,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};
