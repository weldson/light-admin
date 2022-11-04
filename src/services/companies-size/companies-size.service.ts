import { CompanySize } from 'interfaces/CompanySize';
import { db } from 'db';

export const listCompaniesSize = async () => {
  const companiesSize = await db.companiesSize.toArray();

  return companiesSize;
};
