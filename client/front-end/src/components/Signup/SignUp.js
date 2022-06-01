import "../Login/Login-style.css";
import FacebookLogo from "../../assets/facebook-logo.svg";
import GoogleLogo from "../../assets/google-logo.svg";
import GithubLogo from "../../assets/github-logo.svg";

export default function Login() {
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
      <form className="login-form">
        <div className="login-form-container">
          <label>Email</label>
          <input type="email" className="login-email"></input>
          <label>Username</label>
          <input className="login-email"></input>

          <label>Password</label>
          <input className="login-password"></input>
          <div className="login-button-container">
            <button className="login-button">Sign up</button>
          </div>
        </div>
      </form>
    </div>
  );
}
