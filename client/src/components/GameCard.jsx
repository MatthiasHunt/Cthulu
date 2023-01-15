import React from "react";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

function lobbyCard(props) {
  const { host, players, status, id } = props;

  const joinGame = (gameid) => {
    localStorage.setItem("current-game", gameid);
  };

  const mode = {
    new: {
      title: "Waiting to Start",
      variant: "success",
    },
    inprogress: {
      title: "Game In Progress",
      variant: "danger",
    },
    completed: {
      title: "Completed Game",
      variant: "dark",
    },
  };

  const { title, variant } = mode[status];

  return (
    <Card
      fluid="md"
      bg={variant}
      text={variant === "light" ? "dark" : "white"}
      className="mb-2 col-md-6"
    >
      <Card.Body>
        <Card.Title>Cool game hosted by {host}</Card.Title>
        <Card.Text>with {players.length} players</Card.Text> {title}
      </Card.Body>
      {status === "new" && <Button onClick={joinGame(id)}>Join Game</Button>}
      <Button onClick={() => console.log("hello")}>Spectate Game</Button>
    </Card>
  );
}

export default lobbyCard;
