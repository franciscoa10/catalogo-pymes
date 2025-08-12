const products = [
  {
    id: 1,
    name: "Camiseta Roja",
    price: 18.99,
    image: "https://via.placeholder.com/200x150/ff4444/ffffff?text=Camiseta",
    description: "Camiseta roja de algodón"
  },
  {
    id: 2,
    name: "Zapatos Negros",
    price: 49.99,
    image: "https://via.placeholder.com/200x150/333333/ffffff?text=Zapatos",
    description: "Zapatos negros de cuero"
  },
  {
    id: 3,
    name: "Gorra Azul",
    price: 14.99,
    image: "https://via.placeholder.com/200x150/008cba/ffffff?text=Gorra",
    description: "Gorra azul ajustable"
  },
  {
    id: 4,
    name: "Pantalón Negro",
    price: 22.43,
    image: "https://via.placeholder.com/200x150/000000/ffffff?text=Pantalón",
    description: "Pantalón negro de vestir"
  }
];

const container = document.getElementById('product-list');
const cartList = document.getElementById('cart');
const payphoneContainer = document.getElementById('pp-button');
const cart = [];

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  let amountWithoutTax = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
    amountWithoutTax += item.price;
  });

  if (cart.length > 0) {
    const totalLi = document.createElement("li");
    totalLi.textContent = `Total: $${total.toFixed(2)}`;
    totalLi.style.fontWeight = "bold";
    cartList.appendChild(totalLi);
  }

  updatePayphoneButton(total, amountWithoutTax);
}

//este es el metodo donde se agrega ell tokend de pyphone y el storeid
function updatePayphoneButton(total, amountWithoutTax) {
  payphoneContainer.innerHTML = "";

  if (total > 0) {
    try {
      const ppb = new PPaymentButtonBox({
        token: 
        '72M0DNrgN_ks6UwFFSs-dFx7uYzaCFtckHYMY0-iOqHpS0PnONt2Dgr7BPHrpO4MNnsokqUDSRdBmb6cvEgM9DqEPmIcfm_Rutuov35nfBaMrkbbpu49MdEnnZl6gm3jojZSUoGjntfTCI5tJJYIdOoxNWI9bbd_ChtJNngxOi--P_d3zqvlthiQsZH2C-Vig9fH-qBnf53fZMP_HazMSDaHimwigE2h8yqoakWJtRpjVpdg05ZZ1iUisxdoaBHj8ILI7yI4NwHnQWEhwOJ3G2Ey2OZDQS_632SdjVS2AUgVFF_N0Rj-4_P0YKq2J5nK_tVdQKSNrTOB17nv2P1BsJQJ3K4',
        clientTransactionId: 'pedido_' + Date.now(),
        amount: Math.round(total * 100),
        amountWithoutTax: Math.round(amountWithoutTax * 100),
        amountWithTax: 0,
        tax: 0,
        currency: "USD",
        storeId: "a7ddd841-8773-4867-968c-cef6bfd143f9",
        reference: "Compra de productos #" + Math.floor(Math.random() * 1000),
        items: cart.map(item => ({
          name: item.name,
          price: Math.round(item.price * 100),
          quantity: 1,
          total: Math.round(item.price * 100)
        })),
        Handler: {
          onSuccess: function(data) {
            alert(`✅ Pago exitoso!\nID: ${data.TransactionId}\nMonto: $${(data.Amount/100).toFixed(2)}`);
            cart.length = 0;
            updateCart();
          },
          onError: function(error) {
            alert("❌ Error en el pago: " + error.Message);
          },
          onClose: function() {
            console.log("Modal de pago cerrado");
          }
        }
      }).render('pp-button');
    } catch (error) {
      console.error("Error al inicializar PayPhone:", error);
      const errorButton = document.createElement("button");
      errorButton.textContent = `Pagar $${total.toFixed(2)} (Error PayPhone)`;
      errorButton.className = "payphone-error-button";
      errorButton.addEventListener("click", () => {
        alert("El sistema de pago no está disponible temporalmente. Por favor intente más tarde.");
      });
      payphoneContainer.appendChild(errorButton);
    }
  }
}




// Mostrar productos
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>Precio: $${product.price.toFixed(2)}</p>
    <button class="add-to-cart">Añadir al carrito</button>
  `;

  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    cart.push(product);
    updateCart();
  });

  container.appendChild(card);
});
