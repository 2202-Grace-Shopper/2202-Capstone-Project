const client = require("../client");
const bcrypt = require("bcrypt"); //for hashing

//admin table has been deleted; this all happens based on the users column "isAdmin" being true

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

//admin for this project: plantboss@mail.com with password admin123
