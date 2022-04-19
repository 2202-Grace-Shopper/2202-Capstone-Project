// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt"); //for hashing

async function createUser({ username, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(username,password)
    VALUES($1,$2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;
    `,
      [username, hashedPassword]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users 
      WHERE id=$1
    `,
      [id]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: users } = await client.query(`
      SELECT *
      FROM users
    `);

    return users;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  client,
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
};
