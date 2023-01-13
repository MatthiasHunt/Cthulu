import io from "socket.io-client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:3001");

function Game() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinGame = () => {
    socket.emit("join_game", name, roomId);
  };

  const leaveGame = () => {};

  return (
    <div class="App">
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
      <p>text</p>
      <button onClick={leaveGame}>Back to Lobby</button>
    </div>
  );
}

export default Game;
