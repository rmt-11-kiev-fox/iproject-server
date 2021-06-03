if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers");
const cors = require('cors')
const Controller = require("./controllers/controller");

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router);

app.get("/", Controller.dashboard);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
