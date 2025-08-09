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

function updatePayphoneButton(total, amountWithoutTax) {
  payphoneContainer.innerHTML = "";

  if (total > 0) {
    const wrapper = document.createElement("div");
    wrapper.className = "payment-wrapper";

    const title = document.createElement("h3");
    title.textContent = "💼 Simulación de pago para PYMEs";
    title.className = "payment-title";
    wrapper.appendChild(title);

    const methodLabel = document.createElement("p");
    methodLabel.textContent = "Selecciona el método de pago:";
    methodLabel.className = "payment-label";
    wrapper.appendChild(methodLabel);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "payment-methods";

    const formContainer = document.createElement("div");
    formContainer.className = "payment-form";

    // Botón tarjeta
    const cardButton = document.createElement("button");
    cardButton.textContent = "💳 Tarjeta de crédito";
    cardButton.className = "payment-button green";
    cardButton.onclick = () => {
      formContainer.innerHTML = `
  <form class="form-box">
    <label>Nombre en la tarjeta</label>
    <input type="text" required>
    
    <label>Número de tarjeta</label>
    <input type="text" maxlength="16" required>
    
    <label>Vencimiento (MM/AA)</label>
    <input type="text" maxlength="5" required>
    
    <label>CVV</label>
    <input type="text" maxlength="3" required>
    
    <button type="submit" class="confirm-button green">Confirmar pago de $${total.toFixed(2)}</button>
  </form>
`; formContainer.querySelector("form").onsubmit = (e) => {
        e.preventDefault();
        alert(`✅ Pago simulado con tarjeta\nMonto: $${total.toFixed(2)}`);
        cart.length = 0;
        updateCart();
      };
    };

    // Botón teléfono
    const phoneButton = document.createElement("button");
    phoneButton.textContent = "📱 Número telefónico";
    phoneButton.className = "payment-button blue";
    phoneButton.onclick = () => {
      formContainer.innerHTML = `
        <form class="form-box">
          <label>Número de teléfono</label>
          <input type="text" maxlength="10" required>
          
          <button type="submit" class="confirm-button blue">Confirmar pago de $${total.toFixed(2)}</button>
        </form>
      `;
      formContainer.querySelector("form").onsubmit = (e) => {
        e.preventDefault();
        alert(`✅ Pago simulado con teléfono\nMonto: $${total.toFixed(2)}`);
        cart.length = 0;
        updateCart();
      };
    };

    buttonContainer.appendChild(cardButton);
    buttonContainer.appendChild(phoneButton);
    wrapper.appendChild(buttonContainer);
    wrapper.appendChild(formContainer);
    payphoneContainer.appendChild(wrapper);
  }
}


// function updatePayphoneButton(total, amountWithoutTax) {
//   payphoneContainer.innerHTML = "";

//   if (total > 0) {
//     try {
//       const ppb = new PPaymentButtonBox({
//         token: 
//         'Rd1aW15SnGNOrq5E-5KhvkxoYLcPZRLvdk9Nw8lS1Q8DXoGxxm8XQEk8p_3VGrZ7_lNiG7p3Me4LSG_-68TZYDIHSvxvOb-U9zLcalWtXJ8EXWCSr7C-I3AvCrH9j7sgcCZNaBsb9JbZdUO71H9Kxydex3JjOyTqisCrXiJx5qpiMTzygFyAj65MFwgQI7ZtuB07NtmRGc92hc0rdiF0-3LjG7gjJ5MmktZQC8BHRhMB6PVKjFacEciBYjy3jVJFLtV1SAo-RPLsAStaFRTuskM8QARVY9QpsfMS3zQfTwpdIEG903KiX5kHy7TPyGT35BwXSOzVfec6qQU5hIgYwejW5Js',
//         clientTransactionId: 'pedido_' + Date.now(),
//         amount: Math.round(total * 100),
//         amountWithoutTax: Math.round(amountWithoutTax * 100),
//         amountWithTax: 0,
//         tax: 0,
//         currency: "USD",
//         storeId: "eb2fe88a-a0ff-46ed-88ff-c94bf43b85b6",
//         reference: "Compra de productos #" + Math.floor(Math.random() * 1000),
//         items: cart.map(item => ({
//           name: item.name,
//           price: Math.round(item.price * 100),
//           quantity: 1,
//           total: Math.round(item.price * 100)
//         })),
//         Handler: {
//           onSuccess: function(data) {
//             alert(`✅ Pago exitoso!\nID: ${data.TransactionId}\nMonto: $${(data.Amount/100).toFixed(2)}`);
//             cart.length = 0;
//             updateCart();
//           },
//           onError: function(error) {
//             alert("❌ Error en el pago: " + error.Message);
//           },
//           onClose: function() {
//             console.log("Modal de pago cerrado");
//           }
//         }
//       }).render('pp-button');
//     } catch (error) {
//       console.error("Error al inicializar PayPhone:", error);
//       const errorButton = document.createElement("button");
//       errorButton.textContent = `Pagar $${total.toFixed(2)} (Error PayPhone)`;
//       errorButton.className = "payphone-error-button";
//       errorButton.addEventListener("click", () => {
//         alert("El sistema de pago no está disponible temporalmente. Por favor intente más tarde.");
//       });
//       payphoneContainer.appendChild(errorButton);
//     }
//   }
// }

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