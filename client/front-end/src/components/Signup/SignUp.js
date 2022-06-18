import "../Login/Login-style.css";
import FacebookLogo from "../../assets/facebook-logo.svg";
import GoogleLogo from "../../assets/google-logo.svg";
import GithubLogo from "../../assets/github-logo.svg";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import updateUser from "../../helpers/updateuser";
import { LoginContext } from "../../helpers/Context";


export default function Login() {
  const [signUpData, setSignUpData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { setIsLoggedIn} = useContext(LoginContext);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/signup",
        signUpData
      );
      updateUser(response.data);
      setIsLoggedIn(true);
      navigate('/');
      
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setSignUpData((state) => ({ ...state, [e.target.name]: e.target.value }));
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
      <form className="login-form" onSubmit={handleSignup}>
        <div className="login-form-container">
          <label>Email</label>
          <input
            type="email"
            className="login-email"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
          ></input>
          <label>Username</label>
          <input
            className="login-email"
            name="username"
            value={signUpData.username}
            onChange={handleChange}
          ></input>

          <label>Password</label>
          <input
            type="password"
            className="login-password"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
          ></input>
          <div className="login-button-container">
            <button className="login-button">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
}
