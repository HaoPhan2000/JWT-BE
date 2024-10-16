require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./src/config/dbConfig");
const corsOptions = require("./src/config/cors");
const Routes = require("./src/routers/router");
const port = process.env.PORT;
//connect to db
db.connect();
const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
