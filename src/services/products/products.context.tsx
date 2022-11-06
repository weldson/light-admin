import React, { useState, createContext, useEffect } from 'react';
import { Product } from 'interfaces/Product';
import { list } from './products.service';

interface ProductsContextProps {
  products: Product[];
  updateProducts: () => Promise<void>;
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

  useEffect(() => {
    updateProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        updateProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
