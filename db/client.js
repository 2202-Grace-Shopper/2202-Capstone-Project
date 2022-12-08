// Connect to DB
const { Client } = require("pg");
const { DATABASE_URL, DB_HOST, DB_USER, DB_PASS, DB_DB } = process.env;

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "CapstoneCommerceSite";

//const DB_URL = DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`; /////////////

let client;

// client = new Client(DATABASE_URL);
// github actions client config
if (process.env.CI) {
  client = new Client({
    host: "localhost",
    port: 5432, /////////////
    user: "postgres",
    password: "postgres",
    database: "postgres",
    ssl: { rejectUnauthorized: false },
  });
} else {
  // local / heroku client config
  client = new Client(DATABASE_URL);
}

module.exports = client;

// {
//     host: DB_HOST,
//     port: 5432, /////////////
//     ssl: true,
//     user: DB_USER,
//     password: DB_PASS,
//     database: DB_DB,
//   }
