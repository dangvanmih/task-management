const express = require("express");
const bodyParser = require("body-parser");
const database = require("./config/database");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const routerApiVer1 = require("./api/v1/routers/index.router");

database.connect();

//parser application/json
app.use(bodyParser.json());

//routerV1
routerApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});