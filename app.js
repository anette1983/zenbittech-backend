const { Pool } = require("pg");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const dealsRouter = require("./routes/api/deals");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const pool = new Pool({
  connectionString: process.env.DB_HOST,
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL:", err);
    process.exit(1);
  } else {
    console.log("PostgreSQL connected successfully");
  }
});

app.use("/api/users", authRouter);
app.use("/api/deals", dealsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
