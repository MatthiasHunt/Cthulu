import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";

function Register(props) {
  const navigate = useNavigate();
  const { setLogin } = props;
  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    theme: "colored",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handlePasswordValidation() === true) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.success === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.success === true) {
        setLogin(JSON.stringify(data.user));
        return navigate("/");
      }
    }
  };

  const handlePasswordValidation = () => {
    const { password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(`Password and confirmation do not match`, toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <Container>
        <div class="Brand">
          <h1>Registration Page</h1>
        </div>
        <Form className="bg-danger" noValidate>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email Address"
              name="email"
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
          <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Create New Account
          </Button>
        </Form>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Register;
