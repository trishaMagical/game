const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const port =3004;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data)=>{
        console.log(`User With ID:${socket.id} joined room: ${data}`);
        socket.join(data)
    });

    socket.on("send_tictactoe",(data)=>{
        console.log("send_tictactoe:",data);
        socket.to(data.room).emit("recived_tictoc", data)

    });


    socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
      });
})


server.listen(port, () => {
  console.log("SERVER RUNNING:" + port);
});