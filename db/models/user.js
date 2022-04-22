// grab our db client connection to use with our adapters
const client = require("../client");
const bcrypt = require("bcrypt"); //for hashing

async function createUser({ username, password, isAdmin }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  // console.log({ hashedPassword });
  // console.log(username, password, isAdmin);

  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(email,password,"isAdmin")
      VALUES($1,$2,$3)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `,
      [username, hashedPassword, isAdmin]
    );

    // console.log("user w/ password:", user);

    delete user.password;

    // console.log("user w/o password:", user);

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
      SELECT id,username
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

//used by function getUser(username)
async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    `,
      [username]
    );

    console.log("from getUserByUsername:", user);

    return user;
  } catch (error) {
    throw error;
  }
}

//for logging in
async function getUser(username, password) {
  // console.log({ username, password }, "combo");
  const savedUser = await getUserByUsername(username);
  console.log({ savedUser });
  const hashedPassword = savedUser.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  console.log("From getUser:", passwordsMatch);

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
        [username]
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
