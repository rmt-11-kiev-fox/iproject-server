if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const indexRouter = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(indexRouter);

app.listen(port, () => {
  console.log("Movie RUN ON", port);
});
