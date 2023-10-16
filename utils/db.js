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
const { PASSWORD } = process.env;

const sequelize = new Sequelize({
  database: "zenbittech_prsf",
  username: "zenbittech_prsf_user",
  password: PASSWORD,
  host: "dpg-ckmlm40u1l6c73bg34hg-a",
  dialect: "postgres",
});

module.exports = {
  sequelize,
};
