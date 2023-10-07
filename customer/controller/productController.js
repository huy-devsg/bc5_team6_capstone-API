const getElement = (selector) => document.querySelector(selector);
const getElementAll = (selector) => document.querySelectorAll(selector);
const renderProductList = (productList) => {
  let stringHTML = "";

  productList.forEach((product) => {
    stringHTML += `
        <div class="product-items__detail col-lg-3 col-md-6 col-sm-12 mt-5">
        <div class="card">
            <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">New</h6>
                <h5 class="card-title">${product.name}</h5>
            </div>
            <img src="${product.img}"
                class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <span class="card-text">From $ ${product.price}</span>
                <span class="btn btn-primary" onclick="addProductToCart(${product.id})">Buy</span>
            </div>
        </div>
    </div>   
        `;
  });

  getElement("#productList").innerHTML = stringHTML;
};

const cartList = JSON.parse(localStorage.getItem("cartList")) || [];

const renderCart = (cartList) => {
  if (cartList) {
    getElement(".btnPurchase").style.display = "inline-block";
    getElement(".modal-body").innerHTML = `
            <table class="table table-striped table-hover">
                <thead id="cartContent">
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Pricing</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col" style="text-align:center;"><i class="fa-solid fa-gear"></i></th>

                    </tr>
                </thead>
                <tbody id="cartItemList">
                </tbody>
                <tbody id="totalMoney">
                    <tr>
                        <td>&emsp;</td>
                        <td>&emsp;</td>
                        <td>&emsp;</td>
                        <td>&emsp;</td>
                        <td id="td__totalMoney">
                        <td>&emsp;</td>

                        </td>
                    </tr>
                </tbody>
            </table>`;

    let stringHTML = "";
    let number = 1;
    let totalMoney = 0;
    let totalQuantity = 0;
    cartList.forEach((cartItem) => {
      stringHTML += `
          <tr>
            <th scope="row">${number++}</th>
            <td>${cartItem.product.name}</td>
            <td>$ ${cartItem.product.price}</td>

            <td>
              <button class='btn-changeQuantity' onclick="decrementQuantity(${
                cartItem.product.id
              })">
                <
              </button>
              ${cartItem.quantity}
              <button class='btn-changeQuantity' onclick="incrementQuantity(${
                cartItem.product.id
              })">
                >
              </button>
            </td>
            <td>$ ${cartItem.product.price * cartItem.quantity}</td>
            <td  style="text-align:center;">
            <button class='btn-changeQuantity' onclick="removeProduct(${
              cartItem.product.id
            })">
            <i class="fa-solid fa-xmark"style =" color:#000"></i>
            </button>
            </td>
          </tr>
        `;
      totalQuantity += cartItem.quantity;
      totalMoney += cartItem.product.price * cartItem.quantity;
    });
    getElement("#cartItemList").innerHTML = stringHTML;
    getElement(".btnCart").setAttribute("data-quantity", totalQuantity);
    if (totalQuantity === 0) {
      getElement(".modal-body").innerHTML = "Chưa có sản phẩm trong giỏ hàng.";
      getElement(".btnPurchase").style.display = "none";
    } else if (totalQuantity > 99) {
      getElement(".btnCart").setAttribute("data-quantity", "99+");
      getElement("#td__totalMoney").innerHTML = "$ " + totalMoney;
    } else {
      getElement("#td__totalMoney").innerHTML = "$ " + totalMoney;
    }
  } else {
    getElement(".modal-body").innerHTML = "Chưa có sản phẩm trong giỏ hàng.";
    getElement(".btnPurchase").style.display = "none";
  }
};
const decrementQuantity = (productId) => addProductToCart(productId, -1);
const incrementQuantity = (productId) => addProductToCart(productId, +1);
const removeProduct = (productId) => cart.removeProduct(productId);
renderCart(cartList);
