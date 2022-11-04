import React, { useState, createContext, useEffect } from 'react';

import { CompanySize } from 'interfaces/CompanySize';
import { listCompaniesSize } from './companies-size.service';

interface CompaniesSizeContextProps {
  companiesSize: CompanySize[];
  updateCompaniesSize: () => Promise<void>;
}

export const CompaniesSizeContext = createContext(
  {} as CompaniesSizeContextProps
);

interface PropviderProps {
  children: React.ReactNode;
}

export const CompaniesSizeContextProvider = ({ children }: PropviderProps) => {
  const [companiesSize, setCompaniesSize] = useState<CompanySize[]>([]);

  const updateCompaniesSize = async () => {
    const response = await listCompaniesSize();

    setCompaniesSize(response);
  };

  useEffect(() => {
    updateCompaniesSize();
  }, []);

  return (
    <CompaniesSizeContext.Provider
      value={{
        companiesSize,
        updateCompaniesSize,
      }}
    >
      {children}
    </CompaniesSizeContext.Provider>
  );
};
