import { v4 as uuid } from 'uuid';

const initProducts = [
  {
    id: uuid(),
    name: "Product 1",
    availableQuantity: 10,
    price: 10.23
  },
  {
    id: uuid(),
    name: "Product 2",
    availableQuantity: 33,
    price: 29.99
  },
  {
    id: uuid(),
    name: "Product 3",
    availableQuantity: 4,
    price: 139.50
  },
  {
    id: uuid(),
    name: "Product 4",
    availableQuantity: 10,
    price: 75
  },
  {
    id: uuid(),
    name: "Product 5",
    availableQuantity: 11,
    price: 99.99
  },
];

export function createProductStore() {
  return {
    products: initProducts,
    cartItems: [],
    addToCart(id, quantity) {
      const productIndex = this.products.findIndex(x => x.id === id);
      if (productIndex === -1) return;

      const product = this.products[productIndex];
      if (quantity > product.availableQuantity) return;

      const cartItemIndex = this.cartItems.findIndex(x => x.id === id);
      if (cartItemIndex == -1) {
        this.cartItems.push({
          id: product.id,
          name: product.name,
          quantity: quantity,
          price: product.price
        });
      } else {
        this.cartItems[cartItemIndex].quantity += quantity;
      }

      this.products[productIndex].availableQuantity -= quantity;
    },
    removeFromCart(id) {
      const productIndex = this.products.findIndex(x => x.id === id);
      if (productIndex === -1) return;

      const cartItem = this.cartItems.find(x => x.id == id);
      if(!cartItem) return;

      this.cartItems = this.cartItems.filter(x => x.id !== id);
      this.products[productIndex].availableQuantity += cartItem.quantity;
    }
  }
}