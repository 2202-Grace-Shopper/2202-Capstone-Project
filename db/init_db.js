const { client, User, createUser } = require("./");

async function buildTables() {
  try {
    client.connect(); //needed????

    console.log("Dropping tables...");

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS admins;
      DROP TABLE IF EXISTS users;
    `);

    console.log("Finished dropping tables, moving on to creating tables...");

    // build tables in correct order
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
      );
      CREATE TABLE admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) UNIQUE NOT NULL,
        price VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        "isActive" BOOLEAN DEFAULT false,
        inStockQuantity INTEGER NOT NULL,
        photoLinkHref VARCHAR(255) NOT NULL,
        photoLinkBody VARCHAR(255)
      );
      CREATE TABLE cart (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        "itemCount" INTEGER,
        price INTEGER
      );
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "cartId" INTEGER REFERENCES cart(id),
        date VARCHAR(255)
      );
    `);

    console.log("Finished creating tables.");
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
