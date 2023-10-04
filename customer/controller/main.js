const fetchProductList = () => {
    getProductList()
        .then((res) => {
            renderProductList(res.data);
        })
        .catch((err) => {
            console.log('fetchProductList Error: ', err);
        });
};

fetchProductList();

const filterProductByType = () => {
    let typeSelect = getElement('#typeSelect');
    let value = typeSelect.value;
    getProductList()
        .then((res) => {
            let productList = res.data;
            if (value === '') {
                renderProductList(res.data);
            } else {
                let result = productList.filter((product) => {
                    return product.type.includes(value);
                });
                renderProductList(result);
            }
        })
        .catch((err) => {
            console.log('filterProductByType Error: ', err);
        });
};

const cart = new Cart();

const addProductToCart = (id) => {
    getProductById(id)
        .then((res) => {
            const product = res.data;
            const quantity = 1;
            const cartItem = new CartItem(product, quantity);

            cart.addProduct(cartItem);
            console.log(cart);
        })
        .catch((err) => {
            console.log('addProductToCart Error: ', err);
        });
};