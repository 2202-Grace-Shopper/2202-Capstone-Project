const express = require("express");
const {
  destroyOrderProduct,
  updateOrderProduct,
} = require("../db/models/order_products");
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
