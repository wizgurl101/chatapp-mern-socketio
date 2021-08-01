import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectToDatabase from "./config/databaseConfig.js";
import userRoutes from "./routes/userRoutes.js";

// config environment variables
dotenv.config();

connectToDatabase();

//Port number
const PORT = process.env.PORT || 5000;

const app = express();
// accept JSON from response.body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mass Effect Fan Club API is running");
});

// mount routes
app.use("/api/users", userRoutes);

app.listen(
  PORT,
  console.log(
    `Mass Effect API Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .yellow.bold
  )
);
