import React, { useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import GameCard from "../components/GameCard";
import NewGameDialog from "../components/NewGameDialog";

const socket = io.connect("http://localhost:3001");

const allGames = [
  { status: "in progress", players: ["1", "2"], id: 1 },
  { status: "waiting to start", players: ["1", "2", "3"], id: 2 },
  { status: "completed", players: [], id: 3 },
];

function Lobby() {
  const navigate = useNavigate();
  const [newGameDialog, setNewGameDialog] = useState(false);

  const logout = () => {
    localStorage.removeItem("app-user");
    navigate("/login");
  };

  return newGameDialog ? (
    <NewGameDialog cancel={() => setNewGameDialog(false)} socket={socket} />
  ) : (
    <div>
      <LobbyCard>
        <button onClick={() => setNewGameDialog(true)}>START NEW GAME</button>
      </LobbyCard>
      {allGames.map((e) => (
        <LobbyCard>
          <GameCard status={e.status} players={e.players} />
        </LobbyCard>
      ))}
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const LobbyCard = styled.article`
  font-size: 1.1rem;
  font-weight: bold;
`;
export default Lobby;
