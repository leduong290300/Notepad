const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRouter = require("./Router/UserRouter");
const PostRouter = require("./Router/PostRouter");
const connectDB = require("./Config/database");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();
const PORT = process.env.PORT || 5000;

app.use("/api/user", UserRouter);
app.use("/api/posts", PostRouter);

app.listen(PORT, console.log("Done"));
