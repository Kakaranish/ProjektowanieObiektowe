import { useLocalStore } from 'mobx-react';
import React from 'react';
import { createProductStore } from './ProductStore';

const ProductContext = React.createContext(null);

export const ProductProvider = ({ children }) => {

  const productStore = useLocalStore(createProductStore);

  return <ProductContext.Provider value={productStore}>
    {children}
  </ProductContext.Provider>
}

export const useProductStore = () => React.useContext(ProductContext);