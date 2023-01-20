import React from "react";

function NewGameDialog({ cancel, socket, host }) {
  const createGame = async () => {
    const gameParams = { host: JSON.parse(host) };
    // const gameParams = "test";
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
