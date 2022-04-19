const express = require("express");
const ordersRouter = express.Router();

const { getAllOrders, getOrderByUser } = require("../db/models/orders");
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
