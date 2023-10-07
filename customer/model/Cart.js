class Cart {
  constructor() {
    this.cartItems = JSON.parse(localStorage.getItem("cartList")) || [];
  }

  saveCart() {
    return localStorage.setItem("cartList", JSON.stringify(this.cartItems));
  }

  addProduct(product, quantity) {
    const check = this.cartItems.find((item) => item.product.id === product.id);
    if (check) {
      check.quantity += quantity;
      console.log("check.quantity: ", check.quantity);
      if (check.quantity <= 0) {
        this.removeProduct(product.id);
        this.cartItems = check;
      }
      this.cartItems = check;
    } else {
      const newProduct = new CartItem(product, quantity);
      this.cartItems.push(newProduct);
    }
  }

  removeProduct(productID) {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== productID
    );
    // let index = this.cartItems.indexOf(productID);
    // console.log("index: ", index);
    this.cartItems.splice(this.cartItems, 1);
    this.saveCart();
    renderCart(this.cartItems);
  }

  //   getTotalPrice() {
  //     return this.cartItems.reduce(
  //       (total, item) => total + item.product.price * item.quantity,
  //       0
  //     );
  //   }

  //   getCartItems() {
  //     return this.cartItems;
  //   }
}
