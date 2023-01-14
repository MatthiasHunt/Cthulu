import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Container from "react-bootstrap/esm/Container";

function Login() {
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "colored",
  };
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = values;
    toast.info(username);
    toast.info(password);
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });
    if (data.success === false) {
      toast.error(data.message, toastOptions);
    }
    if (data.success === true) {
      localStorage.setItem("app-user", JSON.stringify(data.user));
      return navigate("/");
    }
  };

  const handleGuest = async (event) => {
    toast.info("You are a guest");
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Container className="py-3 px-5">
      <div className="Brand">
        <h1>Login Page</h1>
      </div>
      <Form className="bg-danger" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button
          type="button"
          variant={darkMode ? "light" : "dark"}
          onClick={handleGuest}
        >
          Continue as Guest
        </Button>
        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Dark
        </Button>
      </Form>
      <span>
        Don't have an account ? <Link to="/register">Create One.</Link>
      </span>
      <ToastContainer />
    </Container>
  );
}
export default Login;
