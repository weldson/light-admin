export interface Product {
  id?: number;
  name: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  shipping: number;
  image: string;
  // categoryId: number;
  // providerId: number;
  categoryProviderId: number;
}
