import React, { createContext, useEffect, useState } from 'react';
import { State } from 'interfaces/State';
import { listStates } from './states.service';

interface StatesContextProps {
  states: State[];
  updateStates: () => Promise<void>;
}

export const StatesContext = createContext({} as StatesContextProps);

interface ProviderProps {
  children: React.ReactNode;
}

export const StatesContextProvider = ({ children }: ProviderProps) => {
  const [states, setStates] = useState<State[]>([]);

  const updateStates = async (): Promise<void> => {
    const response = await listStates();

    setStates(response);
  };

  useEffect(() => {
    updateStates();
  }, []);

  return (
    <StatesContext.Provider
      value={{
        states,
        updateStates,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};
