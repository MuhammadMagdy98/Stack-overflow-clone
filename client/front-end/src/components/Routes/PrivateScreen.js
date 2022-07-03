import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../helpers/Context";

export default function PrivateScreen() {
  const { setUsername, isLoggedIn, username, setIsLoggedIn } =
    useContext(LoginContext);

  useEffect(() => {
    let token = { token: localStorage.getItem("token") };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    };
    axios
      .get("http://localhost:3001/", config)
      .then((response) => {
        console.log(response.data.username);
        setUsername(response.data.username);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setUsername("");
        setIsLoggedIn(false);
      });
  }, []);

  return <></>;
}
