const express = require('express');
const app = express();
const port = 3000;

let cors = require('cors');
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addItemToCart(productId, name, price, quantity) {
  const newItem = {
    productId: parseInt(productId),
    name: name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };
  cart.push(newItem);
  return cart;
}

app.get('/cart/add', (req, res) => {
  const productId = req.query.productId;
  const name = req.query.name;
  const price = req.query.price;
  const quantity = req.query.quantity;
  const updatedCart = addItemToCart(productId, name, price, quantity);
  res.json({ cartItems: updatedCart });
});

function editItemQuantity(productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === parseInt(productId)) {
      cart[i].quantity = parseInt(quantity);
      break;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  const productId = req.query.productId;
  const quantity = req.query.quantity;
  const updatedCart = editItemQuantity(productId, quantity);
  res.json({ cartItems: updatedCart });
});

function deleteItemFromCart(productId) {
  cart = cart.filter((item) => item.productId !== parseInt(productId));
  return cart;
}

app.get('/cart/delete', (req, res) => {
  const productId = req.query.productId;
  const updatedCart = deleteItemFromCart(productId);
  res.json({ cartItems: updatedCart });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function calculateTotalQuantity() {
  let total = 0;
  for (let item of cart) {
    total += item.quantity;
  }
  return total;
}

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = calculateTotalQuantity();
  res.json({ totalQuantity });
});

function calculateTotalPrice() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

app.get('/cart/total-price', (req, res) => {
  const totalPrice = calculateTotalPrice();
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
