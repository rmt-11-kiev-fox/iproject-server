if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const {
  userRouters,
  productRouters,
  auctionRouters,
  ongkirRouters,
} = require("./routers");
const errorHandler = require("./middlewares/errorsHandling");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

io.on("connection", (socket) => {
  socket.on("live-bidding", (payload) => {
    socket.broadcast.emit("liveBiddingMessage", payload);
  });
});

app.use(ongkirRouters);
app.use(userRouters);
app.use(productRouters);
app.use(auctionRouters);

app.use(errorHandler);

http.listen(3000, () => console.log("work"));
