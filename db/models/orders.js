const client = require("../client");
const { getOrderProductsByOrder, destroyOrderProduct } = require("./cart");

module.exports = {
  getAllOrders,
  createOrder,
  getOrderByUser,
  destroyOrder,
  getOrdersWithoutProducts,
};

async function createOrder({
  email,
  orderStatus,
  totalPurchasePrice,
  totalQuantity,
  orderDate,
}) {
  console.log(totalPurchasePrice);
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders(email, "orderStatus", "totalPurchasePrice", "totalQuantity", "orderDate" )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`,
      [email, orderStatus, totalPurchasePrice, totalQuantity, orderDate]
    );
    return order;
  } catch (err) {
    console.error(err);
  }
}
async function getOrdersWithoutProducts() {
  try {
    const { rows: orders } = await client.query(`
        SELECT * FROM orders;
        `);

    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
        SELECT orders.*,
         JSON_AGG(
            JSON_BUILD_OBJECT(                
                'productId', op."productId",
                 'price', op."eachPrice",
                 'quantity', op."eachQuantity"
             )
         ) AS items
        FROM orders
            JOIN order_products AS op
                ON orders.id = op."orderId"
        GROUP BY orders.id;`);

    return orders;
  } catch (err) {
    console.error(err);
  }
}

async function getOrderByUser({ id }) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT orders.*,
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'productId', product.id,
                'price', op."eachPrice",
                'quantity', op."eachQuantity"
            )
        ) AS items
        FROM orders
            JOIN order_products AS op
                ON orders.id = op."orderId"
        WHERE "userId" = $1
        GROUP BY orders.id;`,
      [id]
    );

    return orders;
  } catch (err) {
    console.error(err);
  }
}

async function destroyOrder(id) {
  try {
    const orderProducts = await getOrderProductsByOrder({ id });

    for (const op of orderProducts) {
      await destroyOrderProduct(op.id);
    }
    const {
      rows: [order],
    } = await client.query(
      `
   DELETE FROM orders
   WHERE id = $1
   RETURNING *`,
      [id]
    );

    return order;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
