import "./Login-style.css";
import FacebookLogo from "../../assets/facebook-logo.svg";
import GoogleLogo from "../../assets/google-logo.svg";
import GithubLogo from "../../assets/github-logo.svg";
import { LoginContext } from "../../helpers/Context";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useContext } from 'react';
import updateUser from "../../helpers/updateuser";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const {setUsername, isLoggedIn, username, setIsLoggedIn} = useContext(LoginContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        loginData
      );
      console.log(response.data);
      setUsername(response.data.username);
      setIsLoggedIn(true);

      updateUser(response.data);

      console.log(isLoggedIn);
      navigate('/');
      
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setLoginData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  return (
    <div className="login-container">
      <div className="social-login">
        <div className="login-google">
          <img className="google-logo" src={GoogleLogo} Login with></img>
          <p> Sign in with google</p>
        </div>
        <div className="login-github">
          <img className="github-logo" src={GithubLogo} Login with></img>
          <p> Sign in with Github</p>
        </div>
        <div className="login-facebook">
          <img className="facebook-logo" src={FacebookLogo} Login with></img>
          <p>Sign in with Facebook</p>
        </div>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-container">
          <label>Email</label>
          <input
            className="login-email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          ></input>

          <label>Password</label>
          <input
            className="login-password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          ></input>
          <div className="login-button-container">
            <button className="login-button">Log in</button>
          </div>
        </div>
      </form>
    </div>
  );
}
