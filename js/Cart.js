class Item {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotal() {
    return this.price * this.quantity;
  }
}

// Define the Cart class
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
