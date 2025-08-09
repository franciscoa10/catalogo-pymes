const { addToCart } = require('../src/prueba');

describe('Agregar al carrito', () => {
  test('agrega un producto correctamente', () => {
    const cart = [];
    const product = { name: "Gorra Azul", price: 14.99 };
    const updatedCart = addToCart(cart, product);

    expect(updatedCart.length).toBe(1);
    expect(updatedCart[0]).toEqual(product);
  });
});