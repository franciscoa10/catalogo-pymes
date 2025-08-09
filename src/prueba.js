// src/cart.js
function addToCart(cart, product) {
  const newCart = [...cart, product];
  return newCart;
}

module.exports = { addToCart };