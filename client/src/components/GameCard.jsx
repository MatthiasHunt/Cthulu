import React from "react";

function lobbyCard(props) {
  const { players, status, id } = props;

  const joinGame = (gameid) => {
    localStorage.setItem("current-game", gameid);
  };

  return (
    <div>
      Cool {status} game with {players.length} players
      {status === "waiting to start" && (
        <button onClick={joinGame(id)}>Join Game</button>
      )}
      <button onClick={() => console.log("hello")}>Spectate Game</button>
    </div>
  );
}

export default lobbyCard;
