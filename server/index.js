const express = require("express");
const cors = require("cors");
http = require("http");
//const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); //Parses incoming JSON into req.body

app.use("/api/auth", authRoutes);

app.get("/", (request, response) => {
  console.log("request made");
  response.send("Hello");
});

app.get("/sqltest", (req, res) => {
  console.log("Testing postgres");
});

//mongoose.connect(...) Time stamp 10:30 in long video
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  console.log(`Server is now running on port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New connection from ${socket.id}`);

  socket.on("join_game", (name, gameId) => {
    socket.to(gameId, `${name} has joined the game`);
    socket.join(gameId);
    console.log(`Room ${gameId} was joined by user ${name} at ${socket.id}`);
  });
  socket.on("disconnect", (reason) => {
    console.log(`User at ${socket.id} disconnected due to ${reason}`);
  });
});
