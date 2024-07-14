import React, { createContext, useState } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [productId, setProductid] = useState(null);

  return (
    <ProductContext.Provider value={{ productId, setProductid }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
