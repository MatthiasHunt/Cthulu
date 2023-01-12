import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/cthulu.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormContainer } from "../components/styled";

function Login() {
  const navigate = useNavigate();
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
    const { username, password } = values;
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
    toast.info("You are are guest");
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <LoginFormContainer className="test">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="Brand">
            <img src={Logo} alt="" />
            <h1>Login Page</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <div class="Buttons">
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
            <button type="button" onClick={handleGuest}>
              Continue as Guest
            </button>
          </div>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </LoginFormContainer>
      <ToastContainer />
    </>
  );
}

const LoginFormContainer = styled(AuthFormContainer)`
  .Buttons {
    display: flex;
    justify-content: center;
  }
`;

export default Login;
