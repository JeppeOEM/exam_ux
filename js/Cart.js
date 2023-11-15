export class Item {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

export class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(itemName) {
    this.items = this.items.filter((item) => item.name !== itemName);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotal(), 0);
  }

  displayCart() {
    console.log("Shopping Cart:");
    this.items.forEach((item) => {
      console.log(`${item.name} - Quantity: ${item.quantity} - Total: $${item.getTotal()}`);
    });
    console.log(`Total Price: $${this.getTotalPrice()}`);
  }
}

export function init_cart() {
  const is_cart = localStorage.getItem("cart");
  console.log(is_cart);
  if (is_cart == null) {
    console.log("hit");
    const cart = new Cart();
    console.log(cart);
    const serialized_cart = JSON.parse(cart);
    localStorage.setItem("cart", serialized_cart);
  }
}
