import React, { useState, createContext, useEffect } from 'react';

import { CompanySize } from 'interfaces/CompanySize';
import { list, save, update, remove } from './companies-size.service';

interface CompaniesSizeContextProps {
  companiesSize: CompanySize[];
  createCompanySize: (companySize: CompanySize) => Promise<void>;
  updateCompanySize: (id: number, companySize: CompanySize) => Promise<void>;
  removeCompanySize: (id: number) => Promise<void>;
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
    const response = await list();

    setCompaniesSize(response);
  };

  const createCompanySize = async (companySize: CompanySize) => {
    await save(companySize);
    await updateCompaniesSize();
  };

  const updateCompanySize = async (id: number, companySize: CompanySize) => {
    await update(id, companySize);
    await updateCompaniesSize();
  };

  const removeCompanySize = async (id: number) => {
    await remove(id);
    await updateCompaniesSize();
  };

  useEffect(() => {
    updateCompaniesSize();
  }, []);

  return (
    <CompaniesSizeContext.Provider
      value={{
        companiesSize,
        createCompanySize,
        updateCompanySize,
        removeCompanySize,
      }}
    >
      {children}
    </CompaniesSizeContext.Provider>
  );
};
