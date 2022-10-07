const express = require('express');
const app = express();
const port = 3000;
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const myapp = http.createServer(app);

app.get('/', (req, res) => res.send('Hello World!!!!'));
const io = new Server(myapp, {
    cors: {
        origin: "http://localhost:19006",
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(`User With ID:${socket.id} joined room: ${data}`);
        socket.join(data)
    });
    socket.on("send_tictactoe", (data) => {
        console.log("send_tictactoe:", data);
        socket.to(data.room).emit("recived_tictoc", data)

    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

myapp.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));