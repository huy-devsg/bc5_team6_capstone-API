class Cart {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
  }

  saveCart() {
    localStorage.setItem("cartList", JSON.stringify(this.cartItems));
  }

  addProduct(product, quantity) {
    const checkAvailable = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (checkAvailable) {
      checkAvailable.quantity += quantity;
      this.saveCart();
      if (checkAvailable.quantity === 0) {
        this.removeProduct(product.id);
        this.saveCart();
      }
    } else {
      const newProduct = new CartItem(product, quantity);
      this.cartItems.push(newProduct);
      this.saveCart();
    }
  }

  removeProduct(productId) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productId
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getCartItems() {
    return this.cartItems;
  }
  payment() {}
}
