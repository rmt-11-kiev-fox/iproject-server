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

let lobbyData = {
    onlineUsers: [],
    connectedUsers: 0,
    get guestsNumber() {
        return this.connectedUsers - this.onlineUsers.length;
    },
    rooms: [],
};

// let onlineUsers = [];
// let connectedUsers = 0;

io.on("connection", (socket) => {
    lobbyData.connectedUsers++;

    // function getGuests() {
    //     return lobbyData.connectedUsers - lobbyData.onlineUsers.length;
    // }

    socket.on("getData", () => {
        socket.emit("updateData", lobbyData);
        // socket.emit("guestsNumber", getGuests());
    });

    socket.on("onLogin", (val) => {
        // console.log("masuk onlogin", val);
        let userIndex = lobbyData.onlineUsers.findIndex(
            (el) => el.email === val.email
        );
        // console.log(userIndex);
        if (userIndex === -1) {
            lobbyData.onlineUsers.push(val);
            socket.email = val.email;
            io.emit("updateData", lobbyData);
            // io.emit("guestsNumber", getGuests());
        }
    });

    socket.on("disconnect", () => {
        // console.log("a user has disconnected", socket.email);
        lobbyData.connectedUsers--;
        if (socket.email) {
            let userIndex = lobbyData.onlineUsers.findIndex(
                (el) => el.email === socket.email
            );
            lobbyData.onlineUsers.splice(userIndex, 1);
        }
        io.emit("updateData", lobbyData);
        // io.emit("guestsNumber", getGuests());
    });

    socket.on("guestHandler", (val) => {
        io.emit("updateData", lobbyData);
    });

    socket.on("sendMessageLobby", (val) => {
        // console.log(val);
        socket.broadcast.emit("newLobbyMessage", val);
    });

    socket.on("userLogout", (val) => {
        console.log(val, socket.email);
        let userIndex = lobbyData.onlineUsers.findIndex(
            (el) => el.email === val.email
        );
        lobbyData.onlineUsers.splice(userIndex, 1);
        socket.email = "";
        io.emit("updateData", lobbyData);
    });

    socket.on("createRoom", (val) => {
        // console.log(val);
        const roomId = lobbyData.rooms.length
            ? lobbyData.rooms[lobbyData.rooms.length - 1].roomId + 1
            : 1;
        const roomObject = {
            roomName: val.roomName,
            roomCreator: val.user,
            roomId,
            users: [],
            songQueue: [],
            currentSongDuration: 0,
            currentSongAt: 0,
            roomChat: [],
        };
        lobbyData.rooms.push(roomObject);
        io.emit("updateData", lobbyData);
    });

    socket.on("joinRoom", (val) => {
        // joinRoom and roomUpdates dijadiin satu.
        // console.log(val, "ini val");
        let roomIndex = lobbyData.rooms.findIndex(
            (el) => el.roomId === val.roomId
        );
        if (roomIndex !== -1) {
            console.log("masuk room index");
            lobbyData.rooms[roomIndex] = val;
        }
        // socket.join(val.roomId, (y) => {
        //     io.sockets
        //         .in(val.roomId)
        //         .emit("roomData", lobbyData.rooms[roomIndex]);
        // });
        io.emit("updateData", lobbyData);
    });
});

httpServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
