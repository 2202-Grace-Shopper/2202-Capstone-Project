// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt"); //for hashing

async function createUser({ email, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(email,password)
    VALUES($1,$2)
    ON CONFLICT (email) DO NOTHING
    RETURNING *;
    `,
      [email, hashedPassword]
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

/////////////////////currently unused
async function getUserByUsername(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    `,
      [email]
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

//for logging in
async function getUser() {
  const savedUser = await getUserByUsername(email);
  const hashedPassword = savedUser.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);

  if (passwordsMatch) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE email=$1
      `,
        [email]
      );

      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  // add your database adapter fns here
  client,
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  getUser,
};
