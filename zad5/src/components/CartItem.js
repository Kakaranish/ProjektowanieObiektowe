import React from 'react';
import { useProductStore } from '../ProductContext';

const CartItem = ({ id, name, quantity, price }) => {

  const productStore = useProductStore();

  const onRemoveCb = () => {
    productStore.removeFromCart(id);
  };

  return <>
    <div className="col-6">
      <div className="col-12 p-3" style={{ border: "1px solid gray" }}>
        <div>
          Name: {name}
        </div>

        <div>
          Quantity: {quantity}
        </div>

        <div>
          Price per item: {price} PLN
        </div>

        <div>
          Total price: {(quantity * price).toFixed(2)} PLN
        </div>

        <button className="btn btn-danger mt-2" onClick={onRemoveCb}>
          Remove from cart
        </button>
      </div>
    </div>

  </>
};

export default CartItem;