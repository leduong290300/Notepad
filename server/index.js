const express = require("express");
const dotenv = require("dotenv");
// const cors = require("cors");
const UserRouter = require("./Router/UserRouter");
const PostRouter = require("./Router/PostRouter");
const connectDB = require("./Config/database");
dotenv.config();
const app = express();
app.use(express.json());
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With",
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

connectDB();
const PORT = process.env.PORT || 5000;
app.use(allowCrossDomain);

app.use("/api/user", UserRouter);
app.use("/api/posts", PostRouter);

app.listen(PORT, console.log("Done"));
