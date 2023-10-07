class Cart {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
  }

  saveCart() {
    return localStorage.setItem("cartList", JSON.stringify(this.cartItems));
  }

  addProduct(product, quantity) {
    const checkAvailable = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (checkAvailable) {
      checkAvailable.quantity += quantity;
      if (checkAvailable.quantity <= 0) {
        this.removeProduct(product.id);
      }
    } else {
      const newProduct = new CartItem(product, quantity);
      this.cartItems.push(newProduct);
    }

    this.saveCart(); // Cập nhật local storage
    renderCart(this.cartItems);
  }

  removeProduct(productID) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productID.toString()
    );
    this.saveCart();
    renderCart(this.cartItems);
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
}
