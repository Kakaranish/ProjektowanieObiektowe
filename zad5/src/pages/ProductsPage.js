import { useObserver } from 'mobx-react-lite';
import React from 'react';
import Cart from '../components/Cart';
import Product from '../components/Product';
import { useProductStore } from '../ProductContext';


const ProductsPage = () => {

  const productStore = useProductStore();

  return useObserver(() =>
    <>
      <div className="container mt-3">


        <div className="row">
          <Cart />

          {
            productStore.products.filter(x => x.availableQuantity > 0).map((product, i) =>
              <Product
                id={product.id}
                name={product.name}
                availableQuantity={product.availableQuantity}
                price={product.price}
                key={i}
              />
            )
          }
        </div>
      </div>
    </>
  )
};

export default ProductsPage;