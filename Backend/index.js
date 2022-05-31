const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(cors());

app.use(express.json());
require("./db.js");
const userRouter = require("./routers/userRouter.js");

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("connected");
});
