const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRouter = require("./Router/UserRouter");
const PostRouter = require("./Router/PostRouter");
const connectDB = require("./Config/database");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", process.env.REACT_URL);
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
//   next();
// });
app.use(
  cors({
    origin: process.env.REACT_URL,
    credentials: true,
  }),
);
connectDB();
app.use(express.json());

app.use("/api/user", UserRouter);
app.use("/api/posts", PostRouter);

app.listen(PORT, console.log("Done"));
