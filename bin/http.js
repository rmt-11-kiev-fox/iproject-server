const app = require("../app");
const http = require("http").createServer(app);
const port = process.env.PORT;

const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("a user has connected");
});

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
