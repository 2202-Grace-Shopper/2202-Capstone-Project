const client = require("../client");

module.exports = {
  getAllOrders,
  createOrder,
  getOrderByUser,
};

async function createOrder({ userId, productId, price, quantity }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", "productId", price, quantity)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
      [userId, productId, price, quantity]
    );
    return order;
  } catch (err) {
    console.error(err);
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
        SELECT * FROM orders;`);

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
