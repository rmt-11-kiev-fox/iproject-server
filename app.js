const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./middleWares/errorHandler");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(port, (_) => {
    console.log("connecting Port : " + port);
});
