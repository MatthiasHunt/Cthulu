import styled from "styled-components";

export const AuthFormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(var(--badass));
  .Brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    h1 {
      color: #ff0000;
      text-transform: uppercase;
    }
    img {
      width: 20%;
      min-width: 120px;
      height: auto;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000088;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: rgba(var(--badass), 0.8);
      padding: 1rem;
      border: 0.3rem solid #030303;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      &:focus {
        border: 0.3rem solid #ffffff;
        outline: none;
      }
      &::placeholder {
        color: pink;
      }
    }
    button {
      background-color: navy;
      color: white;
      padding: 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      &:hover {
        background-color: red;
      }
      &:focus {
        border: 0.3rem solid #ffffff;
        outline: none;
        background-color: red;
      }
    }
  }
`;
