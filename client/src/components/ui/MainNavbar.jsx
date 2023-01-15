import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/esm/Navbar";
import NavDropdown from "react-bootstrap/esm/NavDropdown";

function MainNavbar(props) {
  const { user, setLogin } = props;
  const logout = () => {
    setLogin("");
  };
  const dropdowns = {
    user: (
      <NavDropdown
        title={user && JSON.parse(user)["username"]}
        className="justify-content-end"
        align="end"
      >
        <NavDropdown.Item>View Profile</NavDropdown.Item>
        <NavDropdown.Item>View Game History</NavDropdown.Item>
        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
      </NavDropdown>
    ),
    guest: (
      <NavDropdown title="guest" className="justify-content-end" align="end">
        <NavDropdown.Item onClick={logout}>Log Out</NavDropdown.Item>
      </NavDropdown>
    ),
    loggedOut: (
      <NavDropdown
        align="end"
        title="You are not logged in"
        className="justify-content-end"
      >
        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
        <NavDropdown.Item>Login as Guest</NavDropdown.Item>
        <NavDropdown.Item href="/register">Create an Account</NavDropdown.Item>
      </NavDropdown>
    ),
  };
  return (
    <Navbar bg="info" variant="info">
      <Container>
        <h4>
          <b>Don't Ruin the Pizza v0.1</b>
        </h4>
        {user
          ? user["isGuest"]
            ? dropdowns["guest"]
            : dropdowns["user"]
          : dropdowns["loggedOut"]}
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
