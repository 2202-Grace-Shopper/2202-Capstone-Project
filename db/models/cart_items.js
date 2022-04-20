const { client } = require("../client");
module.exports = {
  createCartItems,
  deleteCartItems,
  updateCartItems,
  getAllCartItems,
};
const createCartItems = async ({ userId, productId, itemCount, price }) => {
  try {
    const {
      rows: [cartItems],
    } = await client.query(
      `
       INSERT INTO cart_items ("userId", "productId", "itemCount", price)
       VALUES ($1, $2, $3, $4)
       RETURNING *;
           
        `,
      [userId, productId, itemCount, price]
    );
    return cartItems;
  } catch (error) {
    throw error;
  }
};

async function deleteCartItems(id) {
  try {
    const {
      rows: [deletedItem],
    } = await client.query(
      `
      DELETE FROM cart_items
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );
    return deletedItem;
  } catch (error) {
    throw error;
  }
}

async function updateCartItems({ userId, productId, itemCount, price }) {
  try {
    const {
      rows: [updateOrder],
    } = await client.query(
      `
        UPDATE cart_items
        SET "userId"=$1, "productId"=$2, "itemCount"=$3, price=$4
        WHERE id=$5
        RETURNING *;
       `,
      [userId, productId, itemCount, price]
    );

    return updateOrder;
  } catch (err) {
    throw err;
  }
}

async function getAllCartItems() {
  try {
    const { rows: cartItems } = await client.query(`
      SELECT * FROM cart_items;
    `);
    return cartItems;
  } catch (error) {
    throw error;
  }
}
