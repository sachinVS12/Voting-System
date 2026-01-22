const express = require("express");
const connectDB = require("./env/db");
const cors = require("cors");
const dotenv = require("dotenv");

//load environment variable
dotenv.config({ path: "./.env" });

//initialize express
const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: ["Content-Length", "Content-dispostion"],
    maxage: 86400,
  }),
);

//Api Routers
app.use("api/v1/auth", authRouters);

//start theserver
const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
