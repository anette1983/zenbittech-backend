const { sequelize } = require("./utils/db");
const app = require("./app");

const startServer = async () => {
  try {
    // Sync the Sequelize models with the database (create tables according to models if they don't exist)
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
