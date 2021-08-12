export const saveToShoppingCart = (product) => {
  // get session cart
  const shoppingCart = getSessionCart();

  const found = shoppingCart.find(
    (productInCart) => productInCart._id == product._id
  );

  if (found) {
    found.quantity = product.quantity;
  } else {
    shoppingCart.push(product);
  }

  // save to session cart
  saveSessionCart(shoppingCart);
};

export const getSessionCart = () => {
  let cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
  // only return product with quantity > 0
  return cart?.filter((p) => p.quantity != 0) ?? [];
};

export const saveSessionCart = (cart) => {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
};

export const getProductQuantity = (productID) => {
  let cart = getSessionCart();
  let product = cart.find((p) => p._id == productID);
  return product != null ? product.quantity : 0;
};

export const getCartItemCount = () => {
  let cart = getSessionCart();
  return cart != null ? cart.length : 0;
};
