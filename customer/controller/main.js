const fetchProductList = () => {
  getProductList()
    .then((res) => {
      renderProductList(res.data);
    })
    .catch((err) => {
      console.log("fetchProductList Error: ", err);
    });
};

fetchProductList();

const filterProductByType = () => {
  let typeSelect = getElement("#typeSelect");
  let value = typeSelect.value;
  getProductList()
    .then((res) => {
      let productList = res.data;
      if (value === "") {
        renderProductList(res.data);
      } else {
        let result = productList.filter((product) => {
          return product.type.includes(value);
        });
        renderProductList(result);
      }
    })
    .catch((err) => {
      console.log("filterProductByType Error: ", err);
    });
};

const cart = new Cart();
console.log(cart);

window.addProductToCart = (id, _quantity) => {
  let quantity = _quantity || 1;
  console.log("addProductToCart quantity: ", quantity);
  console.log("addProductToCart id: ", id);
  getProductById(id)
    .then((res) => {
      let product = res.data;
      cart.addProduct(product, quantity);
      renderCart(cart.cartItems);
    })
    .catch((err) => {
      console.log("addProductToCart Error: ", err);
    });
};
