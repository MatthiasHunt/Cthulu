import React from "react";

function NewGameDialog({ cancel, socket }) {
  const createGame = async () => {
    const gameParams = {
      author: "matthias",
      status: "waiting to start",
      players: ["matthias"],
    };
    await socket.emit("create_game", gameParams);
  };
  return (
    <span>
      NewGameDialog
      <button onClick={cancel}>CANCEL</button>
      <button onClick={createGame}>MAKE GAME</button>
    </span>
  );
}

export default NewGameDialog;
