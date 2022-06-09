import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../helpers/Context";

export default function PrivateScreen() {
  const { setUsername, isLoggedIn, username, setIsLoggedIn } = useContext(LoginContext);
  
  useEffect(() => {
    let token = { token: localStorage.getItem("jwt") };

    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwt")}`,
        },
      };
      axios.get('http://localhost:3001/', config)
      .then(response => {
          setUsername(response.username);
          setIsLoggedIn(true);
      })
      .catch(err => {
          localStorage.removeItem("jwt");
      })
  }, [])
  
  return <></>;
}
