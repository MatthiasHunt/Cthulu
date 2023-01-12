import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/cthulu.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormContainer } from "../components/styled";

function Register() {
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
        localStorage.setItem("app-user", JSON.stringify(data.user));
        return navigate("/");
      }
    }
  };

  const handlePasswordValidation = () => {
    const { password, confirmPassword, username, email } = values;
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
      <AuthFormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="Brand">
            <img src={Logo} alt="" />
            <h1>Registration Page</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" onClick={handleSubmit}>
            Create New Account
          </button>
          <span>
            Already have an account ?{" "}
            <Link to="/login">Click here to login</Link>
          </span>
        </form>
      </AuthFormContainer>
      <ToastContainer />
    </>
  );
}

export default Register;
