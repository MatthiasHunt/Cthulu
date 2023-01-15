import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import io from "socket.io-client";
import GameCard from "../components/GameCard";
import NewGameDialog from "../components/NewGameDialog";

const socket = io.connect("http://localhost:3001");

const allGames = [
  { status: "inprogress", players: ["1", "2"], id: 1, host: "Big Bird" },
  {
    status: "new",
    players: ["1", "2", "3"],
    id: 2,
    host: "Snuffy",
  },
  { status: "completed", players: [], id: 3, host: "Elmo" },
  { status: "completed", players: [], id: 3, host: "Elmo" },
  { status: "completed", players: [], id: 3, host: "Elmo" },
  { status: "completed", players: [], id: 3, host: "Elmo" },
];

function Lobby() {
  const [newGameDialog, setNewGameDialog] = useState(false);

  return newGameDialog ? (
    <NewGameDialog cancel={() => setNewGameDialog(false)} socket={socket} />
  ) : (
    <Container>
      <Row>
        <Button variant="light" onClick={() => setNewGameDialog(true)}>
          START NEW GAME
        </Button>
        {allGames.map((e) => (
          <GameCard status={e.status} players={e.players} host={e.host} />
        ))}
      </Row>
    </Container>
  );
}

export default Lobby;
