require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./Server/config/database"); 
const app = express();
const userRouter = require("./Server/api/users/user.router");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("listning though port", port);
});
