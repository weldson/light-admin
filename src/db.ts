import Dexie, { Table } from 'dexie';

import { Bag } from 'interfaces/Bag';
import { Category } from 'interfaces/Category';
import { CategoryProvider } from 'interfaces/CategoryProvider';
import { City } from 'interfaces/City';
import { CompanySize } from 'interfaces/CompanySize';
import { Customer } from 'interfaces/Customer';
import { Order } from 'interfaces/Order';
import { OrderProduct } from 'interfaces/OrderProduct';
import { Payment } from 'interfaces/Payment';
import { Product } from 'interfaces/Product';
import { Provider } from 'interfaces/Provider';
import { State } from 'interfaces/State';

export class XShopDexie extends Dexie {
  bags!: Table<Bag>;

  categories!: Table<Category>;

  categoryProvider!: Table<CategoryProvider>;

  cities!: Table<City>;

  companiesSize!: Table<CompanySize>;

  customers!: Table<Customer>;

  orders!: Table<Order>;

  orderProduct!: Table<OrderProduct>;

  payments!: Table<Payment>;

  providers!: Table<Provider>;

  products!: Table<Product>;

  states!: Table<State>;

  constructor() {
    super('xshop');
    this.version(1).stores({
      bags: '++id, name, price',
      categories: '++id, name',
      categoryProvider: '++id, categoryId, providerId',
      cities: '++id, name, stateId',
      companiesSize: '++id, name',
      customers: '++id, name, phone, birth',
      orders: '++id, date, paymentId, customerId',
      orderProduct: '++id, quantity, discount, productId, orderId, bagId',
      payments: '++id, name, tax',
      products:
        '++id, name, quantity, buyPrice, sellPrice, shipping, image, categoryProviderId',
      providers:
        '++id, name, phone, companySizeId, instagram, website, whatsapp, street, number, neighborhood, cityId',
      states: '++id, name, slug',
    });
  }
}

export const db = new XShopDexie();
