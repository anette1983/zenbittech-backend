// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   host: "localhost",
//   database: "postgres",
//   username: "postgres",
//   password: "6528",
//   dialect: "postgres",
//   logging: console.log,
// });

// console.log(sequelize.config); // Add this line for debugging

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

require("dotenv").config();
const { PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_HOST, {
  // database: "postgres",
  // username: "postgres",
  // password: PASSWORD,
  // host: "localhost",
  dialect: "postgres",
});

module.exports = {
  sequelize,
};
