import "./Login-style.css";
export default function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="social-login">
          <div className="login-google">Login with google</div>
          <div className="login-github">Login with github</div>
          <div className="login-facebook">Login with facebook</div>
        </div>
        <form className="login-form">
          <div className="login-form-container">
            <label>Email</label>
            <input className="login-email"></input>

            <label>Password</label>
            <input className="login-password"></input>
            <div className="login-button-container">
              <button className="login-button">Log in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
