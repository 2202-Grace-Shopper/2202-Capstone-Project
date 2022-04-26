const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  getOrderByUser,
  createOrder,
  destroyOrder,
} = require("../db/models/orders");
const authorizeUser = require("./utils");

ordersRouter.get("/", authorizeUser, async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

ordersRouter.get("/", authorizeUser, async (req, res, next) => {
  try {
    const orders = await getOrderByUser({ id: req.params.userId });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, orderStatus, totalPurchasePrice, totalQuantity, orderDate } =
      req.body;
    const order = await createOrder({
      email,
      orderStatus,
      totalPurchasePrice,
      totalQuantity,
      orderDate,
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

ordersRouter.delete("/:orderId", authorizeUser, async (req, res, next) => {
  try {
    const deletedOrder = await destroyOrder(req.params.orderId);
    res.send(deletedOrder);
  } catch (err) {
    next(err);
  }
});

module.exports = ordersRouter;
