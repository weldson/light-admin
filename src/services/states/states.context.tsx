import React, { createContext, useEffect, useState } from 'react';
import { State } from 'interfaces/State';
import { listStates, remove, save, update } from './states.service';

interface StatesContextProps {
  states: State[];
  createState: (state: State) => Promise<void>;
  updateState: (id: number, state: State) => Promise<void>;
  removeState: (id: number) => Promise<void>;
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

  const createState = async (state: State) => {
    await save(state);
    await updateStates();
  };

  const updateState = async (id: number, state: State) => {
    await update(id, state);
    await updateStates();
  };

  const removeState = async (id: number) => {
    await remove(id);
    await updateStates();
  };

  useEffect(() => {
    updateStates();
  }, []);

  return (
    <StatesContext.Provider
      value={{
        states,
        createState,
        updateState,
        removeState,
      }}
    >
      {children}
    </StatesContext.Provider>
  );
};
