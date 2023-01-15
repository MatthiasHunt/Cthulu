import { useState } from "react";

export default function useLogin() {
  const getLogin = () => {
    const userData = localStorage.getItem("app-user");
    return userData;
  };
  const [login, setLogin] = useState(getLogin());

  const saveLogin = (user) => {
    user
      ? localStorage.setItem("app-user", user)
      : localStorage.removeItem("app-user");
    setLogin(user);
  };

  return [login, saveLogin];
}
