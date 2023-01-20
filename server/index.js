const express = require("express");
const cors = require("cors");
http = require("http");
const Redis = require("ioredis");
const authRoutes = require("./routes/auth");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); //Parses incoming JSON into req.body

app.use("/api/auth", authRoutes);
const client = new Redis({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
});

const test = () => {
  return client.get("example");
};
client.on("connect", async () => {
  console.log("Connected to Redis");
  const msg = await test();
  console.log(msg);
});

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

let allGames = [
  { status: "inprogress", players: ["1", "2"], id: 1, host: "Big Bird" },
  {
    status: "new",
    players: ["1", "2", "3"],
    id: 2,
    host: "Snuffy",
  },
  { status: "completed", players: [], id: 3, host: "Elmo" },
  { status: "completed", players: [], id: 4, host: "Elmo" },
];

io.on("connection", (socket) => {
  console.log(`New connection from ${socket.id}`);

  socket.on("create_game", (data) => {
    const host = data.host;
    console.log(host.username);
    allGames.push({
      status: "new",
      players: [host.username],
      host: host.username,
    });
    console.log(allGames);
    io.to("lobby").emit("lobby_data", JSON.stringify(allGames));
  });

  socket.on("join_lobby", (name) => {
    socket.join("lobby");
    socket.emit("lobby_data", JSON.stringify(allGames));
    console.log(`${name} has joined the lobby`);
  });

  socket.on("join_game", (name, gameId) => {
    socket.to(gameId, `${name} has joined the game`);
    socket.join(gameId);
    console.log(`Room ${gameId} was joined by user ${name} at ${socket.id}`);
  });
  socket.on("disconnect", (reason) => {
    console.log(`User at ${socket.id} disconnected due to ${reason}`);
  });
});
