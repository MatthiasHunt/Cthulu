import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import MainNavbar from "./components/ui/MainNavbar";
import useLogin from "./hooks/useLogin";

export default function App() {
  const [user, setUser] = useLogin();
  return (
    <>
      <MainNavbar user={user} setLogin={setUser} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Lobby /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login setLogin={setUser} />} />
          <Route path="/register" element={<Register setLogin={setUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}
