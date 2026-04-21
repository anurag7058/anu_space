const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let orders = [];
let orderId = 1;

app.get("/api/products", (req, res) => {
  res.json([
    { id: 1, name: "Shoes", price: 2000 },
    { id: 2, name: "T-Shirt", price: 800 }
  ]);
});

app.post("/api/orders", (req, res) => {
  const { items, total, method } = req.body;

  const order = {
    id: orderId++,
    items,
    total,
    method,
    status: "Confirmed"
  };

  orders.push(order);
  res.json(order);
});

app.listen(3001, () => {
  console.log("MyShop backend running on http://localhost:3001");
});