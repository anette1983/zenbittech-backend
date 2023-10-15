// const mongoose = require("mongoose");
const { sequelize } = require("./utils/db");
const app = require("./app");

// const { DB_HOST } = process.env;

// mongoose.set("strictQuery", true);

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection successful");
//     app.listen(3000, () => {
//       console.log("Server running. Use our API on port: 3000");
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });

const startServer = async () => {
  try {
    // Sync the Sequelize models with the database (create tables if they don't exist)
    await sequelize.sync();

    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

startServer();
