const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log("done"));
