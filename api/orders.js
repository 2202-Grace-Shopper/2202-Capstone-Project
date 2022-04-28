const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  getOrderByUser,
  createOrder,
  destroyOrder,
  getUserOrderInCart,
} = require("../db/models/orders");
const authorizeUser = require("./utils");

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});
// curl http://localhost:4000/api/orders/ -X GET

//gets all orders based on email
ordersRouter.get("/:userEmail", async (req, res, next) => {
  try {
    const orders = await getOrderByUser({ email: req.params.userEmail });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});
// curl http://localhost:4000/api/orders/albert@mail.com -X GET

//gets orders with status "cart" based on email
ordersRouter.get("/:userEmail/cart", async (req, res, next) => {
  console.log("inside api ordersRouter.get");

  try {
    const order = await getUserOrderInCart({ email: req.params.userEmail });

    console.log("what comes back:", order);

    res.send(order);
  } catch (err) {
    next(err);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    // const { email } = req.body;
    console.log("user.id from req:", req.user.id);

    const order = await createOrder({ userId: req.user.id });

    res.send(order);
  } catch (err) {
    next(err);
  }
});
// curl http://localhost:4000/api/orders -X POST -H 'Content-Type':'application/json'

ordersRouter.delete("/:orderId", authorizeUser, async (req, res, next) => {
  try {
    const deletedOrder = await destroyOrder(req.params.orderId);
    res.send(deletedOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
