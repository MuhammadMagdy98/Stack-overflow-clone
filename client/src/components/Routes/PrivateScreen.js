import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../helpers/Context";
import jwtDecode from "jwt-decode";

export default function PrivateScreen() {
  const { setUsername, isLoggedIn, username, setIsLoggedIn } =
    useContext(LoginContext);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    };
    axios
      .get("http://localhost:3001/", config)
      .then((response) => {
        console.log(response.data.token);
        console.log(response.data);
        const userName = jwtDecode(response.data.token).username;
        setUsername(userName);
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log("catch");
        setUsername("");
        setIsLoggedIn(false);
        localStorage.clear();
      });
  }, []);

  return <></>;
}
