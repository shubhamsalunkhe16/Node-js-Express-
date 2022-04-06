const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8989;
const db = require("./models");

app.use(express.json());
app.use(cors());

const userRouter = require("./controller/UserController");
app.use("/users", userRouter);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
  });
});
