const express = require("express");
const {
  destroyOrderProduct,
  updateOrderProduct,
  addProductToOrder,
} = require("../db/models/cart");
const authorizeUser = require("./utils");
const orderProductsRouter = express.Router();

orderProductsRouter.patch(
  "/:orderProductId",
  authorizeUser,
  async (req, res, next) => {
    try {
      const { productId, eachPrice, eachQuantity } = req.body;
      const orderProduct = await updateOrderProduct({
        id: req.params.orderProductId,
        productId,
        eachPrice,
        eachQuantity,
      });
      res.send(orderProduct);
    } catch (err) {
      next(err);
    }
  }
);
orderProductsRouter.post("/", async (req, res, next) => {
  console.log("Hi from router");
  try {
    const { productId, eachPrice, eachQuantity } = req.body;
    const orderProduct = await addProductToOrder({
      productId,
      eachPrice,
      eachQuantity,
    });
    console.log(orderProduct);
    res.send(orderProduct);
  } catch (err) {
    next(err);
  }
});

orderProductsRouter.delete(
  "/:orderProductId",
  authorizeUser,
  async (req, res, next) => {
    try {
      const orderProduct = await destroyOrderProduct(req.params.orderProductId);
      res.send(orderProduct);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = orderProductsRouter;
