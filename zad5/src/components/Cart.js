import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { useProductStore } from '../ProductContext';
import CartItem from './CartItem';

const Cart = () => {

  const productStore = useProductStore();

  return useObserver(() => {
    if (!productStore.cartItems.length) {
      return <>
        <div className="col-12 my-2" style={{ border: "1px solid green" }}>
          You cart is empty
        </div>
      </>
    }
    else {
      return <>
        <div className="col-12 my-2 p-3" style={{ border: "1px solid green" }}>
          <h4>Your cart</h4>
          <div className="row">
            {
              productStore.cartItems.map((cartItem, index) =>
                <CartItem
                  key={index}
                  id={cartItem.id}
                  name={cartItem.name}
                  price={cartItem.price}
                  quantity={cartItem.quantity}
                />
              )
            }
          </div>
        </div>
      </>
    }
  });
};

export default Cart;