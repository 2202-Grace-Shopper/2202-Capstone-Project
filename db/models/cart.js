const client = require("../client");

module.exports = {
  updateCartProduct,
  destroyCartProduct,
  getCartProductById,
  getCartProductsByOrder,
  addProductToCart,
};

async function addProductToCart({ productId, eachPrice, eachQuantity }) {
  console.log("reached addProduct function");
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
        INSERT INTO order_products("productId", "eachPrice", "eachQuantity")
        VALUES ($1, $2, $3)
        RETURNING *;`,
      [productId, eachPrice, eachQuantity]
    );
    console.log("OrderProduct", orderProduct);
    return orderProduct;
  } catch (err) {
    console.error(err);
  }
}

async function getCartProductById(id) {
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

async function getCartProductsByOrder({ id }) {
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

async function updateCartProduct({ id, productId, eachPrice, eachQuantity }) {
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

async function destroyCartProduct(id) {
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
