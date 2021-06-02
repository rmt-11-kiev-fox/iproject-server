if (process.env.NODE_ENV !== "production") require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

const cors = require("cors");
const router = require("./routes/index.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

let onlineUsers = [];
let guests = 0;

io.on("connection", (socket) => {
    socket.on("getData", () => {
        socket.emit("onlineUsers", onlineUsers);
        socket.emit("guestsNumber", guests);
    });

    socket.on("onLogin", (val) => {
        // console.log("masuk onlogin", val);
        onlineUsers.push(val);
        console.log("masuk onlogin", onlineUsers);
        socket.email = val.email;
        io.emit("onlineUsers", onlineUsers);
    });

    socket.on("disconnect", (val) => {
        console.log("a user has disconnected", socket.email);
        if (socket.email) {
            let userIndex = onlineUsers.findIndex(
                (el) => el.email === socket.email
            );
            onlineUsers.splice(userIndex, 1);
            io.emit("onlineUsers", onlineUsers);
        } else {
            guests -= 1;
            io.emit("guestsNumber", guests);
        }
    });

    socket.on("guestHandler", (val) => {
        if (!val) {
            guests -= 1;
            io.emit("guestsNumber", guests);
        } else {
            guests += 1;
            io.emit("guestsNumber", guests);
        }
    });
});

httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
