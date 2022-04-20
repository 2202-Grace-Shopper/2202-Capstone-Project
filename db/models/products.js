const client = require("./client");

async function createProduct({
  title,
  price,
  description,
  category,
  isActive,
  inStockQuantity,
  photoLinkHref,
  photoLinkBody,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products (title, price, description, category, "isActive", "inStockQuantity", "photoLinkHref", "photoLinkBody")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
        `,
      [
        title,
        price,
        description,
        category,
        isActive,
        inStockQuantity,
        photoLinkHref,
        photoLinkBody,
      ]
    );
    return product;
  } catch (err) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(
      `SELECT * 
          FROM products;
          `
    );

    return products;
  } catch (err) {
    throw err;
  }
}

async function updateProduct({
  title,
  price,
  description,
  category,
  isActive,
  inStockQuantity,
  photoLinkHref,
  photoLinkBody,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    UPDATE products
    SET title=$1, price=$2, description=$3, category=$4, isActive=$5, inStockQuantity=$6, photoLinkHref=$7, photoLinkBody=$8
    WHERE id=$9
    RETURNING *;
    `,
      [
        title,
        price,
        description,
        category,
        isActive,
        inStockQuantity,
        photoLinkHref,
        photoLinkBody,
        id,
      ]
    );
    return product;
  } catch (err) {
    throw err;
  }
}

async function getProductById(id) {
  try {
    const { rows: product } = await client.query(
      `
      SELECT * 
      FROM products
      WHERE id=$1;
      `,
      [id]
    );

    return product;
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(id) {
  try {
    const { rows: product } = await client.query(
      `
      DELETE
      FROM products
      WHERE id=$1
      RETURNING *;
      `,
      [id]
    );

    return product;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  getProductById,
  deleteProduct,
};
