import io from "socket.io-client";
import React, { useState } from "react";
import Game from "./Game";
import { Link } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function Lobby() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinGame = () => {
    socket.emit("join_game", name, roomId);
  };

  return (
    <div className="App">
      <p>My front-end app. It's a pretty basic app</p>
      <input
        type="text"
        name="name"
        placeholder={"Name"}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        type="text"
        name="roomId"
        placeholder={"RoomID"}
        onChange={(event) => {
          setRoomId(event.target.value);
        }}
      />
      <button onClick={joinGame}>Click Me</button>
      <Game socket={socket} />
      <Link to={"/login"}>Click here to Login</Link>
    </div>
  );
}

export default Lobby;
