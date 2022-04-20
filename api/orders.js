const express = require("express");
const ordersRouter = express.Router();

const {
  getAllOrders,
  getOrderByUser,
  createOrder,
} = require("../db/models/orders");
const authorizeUser = require("./auth");

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

ordersRouter.post("/", authorizeUser, async (req, res, next) => {
  try {
    const { orderStatus, totalPurchasePrice, totalQuantity, orderDate } =
      req.body;
    const order = await createOrder({
      userId: req.user.id,
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

module.exports = ordersRouter;
