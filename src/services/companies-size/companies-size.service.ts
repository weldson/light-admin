import { CompanySize } from 'interfaces/CompanySize';
import { db } from 'db';

export const list = async () => {
  const companiesSize = await db.companiesSize.toArray();

  return companiesSize;
};

export const save = async (companySize: CompanySize) => {
  await db.companiesSize.add(companySize);
};

export const update = async (id: number, companySize: CompanySize) => {
  await db.companiesSize.update(id, companySize);
};

export const remove = async (id: number) => {
  await db.companiesSize.delete(id);
};
