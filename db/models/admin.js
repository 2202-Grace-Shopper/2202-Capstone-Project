const client = require("../client");
const bcrypt = require("bcrypt"); //for hashing

async function createAdmin({ email, password }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [admin],
    } = await client.query(
      `INSERT INTO admin(email,password)
        VALUES($1,$2)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
    `,
      [email, hashedPassword]
    );

    delete admin.password;

    return admin;
  } catch (error) {
    throw error;
  }
}

module.exports = { client, createAdmin };
