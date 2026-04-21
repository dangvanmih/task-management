const express = require("express");
const app = express();
require("dotenv").config();
const routerApiVer1 = require("./api/v1/routers/index.router");
const database = require("./config/database");
const port = process.env.PORT;

database.connect();

//routerV1
routerApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});