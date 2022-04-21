const client = require("../client");

module.exports = {
  createOrderProduct,
  updateOrderProduct,
  destroyOrderProduct,
  getOrderProductById,
  getOrderProductsByOrder,
};

async function createOrderProduct({
  productId,
  orderId,
  eachPrice,
  eachQuantity,
}) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
        INSER INTO order_products("productId", "orderId", "eachPrice", "eactQuantity")
        VALUES ($1, $2, $3, $4)
        RETURNING *;`,
      [productId, orderId, eachPrice, eachQuantity]
    );
    return orderProduct;
  } catch (err) {
    console.error(err);
  }
}

async function getOrderProductById(id) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
SELECT * FROM order_products
WHERE id = $1;`,
      [id]
    );

    return orderProduct;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getOrderProductsByOrder({ id }) {
  try {
    const { rows: orderProducts } = await client.query(
      `
    SELECT * FROM order_products
    WHERE "orderId" = $1;`,
      [id]
    );
    return orderProducts;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateOrderProduct({ id, productId, eachPrice, eachQuantity }) {
  try {
    const fields = { productId, eachPrice, eachQuantity };
    for (const key in fields) {
      if (fields[key] === undefined) delete fields[key];
    }
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");
    const {
      rows: [orderProduct],
    } = await client.query(
      `
        UPDATE order_products
        SET ${setString}
        WHERE id=$1
        RETURNING *;`,
      [id, ...Object.values(fields)]
    );

    return orderProduct;
  } catch (err) {
    console.error(err);
  }
}

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
DELETE FROM order_products
WHERE id = $1
RETURNING *;`,
      [id]
    );
    return orderProduct;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
