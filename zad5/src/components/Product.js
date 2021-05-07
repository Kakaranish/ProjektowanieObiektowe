import React, { useState } from 'react';
import { useProductStore } from '../ProductContext';

const Product = ({ id, name, availableQuantity, price }) => {

  const [quantity, setQuantity] = useState(1);
  const productStore = useProductStore();

  const onAddToCart = () => {

    if (quantity <= 0) return;

    if (quantity > availableQuantity) {
      alert("Product is not available in such quantity");
      return;
    }

    productStore.addToCart(id, quantity);
  };

  return <>
    <div className="col-4 mb-3">
      <div className="col-12 px-3 py-2" style={{ border: "1px solid gray" }}>
        <p>
          <b>Name:</b> {name}
        </p>

        <p>
          <b>Available Quantity:</b> {availableQuantity}
        </p>

        <p>
          <b>Price:</b> {price.toFixed(2)} PLN
        </p>

        <div className="row">

          <div className="col-3">
            <input type="text" className="form-control"
              value={quantity} min={1} max={availableQuantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>

          <div className="col-9">
            <button className="btn btn-success col-12" onClick={onAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>


    </div>
  </>
};

export default Product;