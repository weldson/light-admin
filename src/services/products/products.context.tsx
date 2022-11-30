import React, { useState, createContext, useEffect } from 'react';
import { Product } from 'interfaces/Product';
import { list, remove, save, update } from './products.service';

interface ProductsContextProps {
  products: Product[];
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (id: number, product: Product) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsContextProps);

interface PropviderProps {
  children: React.ReactNode;
}

export const ProductsContextProvider = ({ children }: PropviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const updateProducts = async () => {
    const response = await list();

    setProducts(response);
  };

  const createProduct = async (product: Product) => {
    await save(product);
    await updateProducts();
  };

  const updateProduct = async (id: number, product: Product) => {
    await update(id, product);
    await updateProducts();
  };

  const removeProduct = async (id: number) => {
    await remove(id);
    await updateProducts();
  };

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        createProduct,
        updateProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
