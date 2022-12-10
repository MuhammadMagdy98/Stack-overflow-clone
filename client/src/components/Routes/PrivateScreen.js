import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../helpers/Context";

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
        console.log(response.data.username);
        console.log(response.data);
        setUsername(response.data.username);
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
