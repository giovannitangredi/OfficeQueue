// Import path module
const path = require("path");

const environment = process.env.NODE_ENV || "development";
console.log(environment);
const dbPath = path.resolve(
  __dirname,
  environment === "testing" ? "db/testing.sqlite" : "db/database.sqlite"
);

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Export the database
module.exports = knex;
