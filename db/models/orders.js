const client = require("../client");

module.exports = {
  getAllOrders,
  createOrder,
  getOrderByUser,
};

async function createOrder({
  userId,
  orderStatus,
  totalPurchasePrice,
  totalQuantity,
  orderDate,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", "orderStatus", "totalPurchasePrice", "totalQuantity", "orderDate" )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
      [userId, orderStatus, totalPurchasePrice, totalQuantity, orderDate]
    );
    return order;
  } catch (err) {
    console.error(err);
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
        SELECT orders.*,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'productId', product.id,
                'price', product.price
            )
        );`);

    return orders;
  } catch (err) {
    console.error(err);
  }
}

async function getOrderByUser({ id }) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT * FROM orders
      WHERE "userId" = $1;`,
      [id]
    );

    return orders;
  } catch (err) {
    console.error(err);
  }
}
