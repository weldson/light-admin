import { Product } from './Product';

export interface Order {
  id?: number;
  paymentId: number;
  customerId: number;
  date: Date;
  products?: Product[];
}
