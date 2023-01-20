import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import GameCard from "../components/GameCard";
import NewGameDialog from "../components/NewGameDialog";
import { socket } from "../utils/socket";

function Lobby(props) {
  const { user } = props;
  const [newGameDialog, setNewGameDialog] = useState(false);
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    socket.emit("join_lobby", "Matthias");
  }, []);

  useEffect(() => {
    socket.on("lobby_data", (data) => {
      setAllGames(JSON.parse(data));
    });
    return () => socket.off("lobby_data");
  }, [socket]);

  return newGameDialog ? (
    <NewGameDialog
      cancel={() => setNewGameDialog(false)}
      socket={socket}
      host={user}
    />
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
