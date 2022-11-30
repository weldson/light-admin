import { Category } from './Category';
import { City } from './City';
import { CompanySize } from './CompanySize';

export interface Provider {
  id?: number;
  name: string;
  phone: string;
  companySizeId: number;
  instagram: string;
  website: string;
  whatsapp: string;
  street: string;
  number: string;
  neighborhood: string;
  cityId: number;
  city?: City;
  companySize?: CompanySize;
  categories: Category[];
}
