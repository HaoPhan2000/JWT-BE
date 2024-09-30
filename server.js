const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./src/config/dbConfig");
require("dotenv").config();
const corsOptions = require("./src/config/cors");
//connect to db
db.connect();
const app = express();
app.use(cors(corsOptions));
const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Routes = require("./src/routers/router");
app.use("/", Routes);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
