import "./Navbar-style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  redirect,
  Link
} from "react-router-dom";
import { LoginContext, TagConext } from "../../helpers/Context";
import { useContext, useEffect } from "react";
import { useState } from "react";
import DownArrow from "../../assets/caret-down-solid.svg";

import UserMenu from "../UserMenu/UserMenu";
import jwtDecode from "jwt-decode"

function Navbar() {
  let navigate = useNavigate();

  function changeUrl(url) {
    navigate(`/${url}`);
  }
  const { setUsername, isLoggedIn, username, isAdmin, setIsAdmin } =
    useContext(LoginContext);
  const [loginState, setLoginState] = useState();
  console.log(loginState);
  console.log(` isAdmin = ${isAdmin}`);
  useEffect(() => {
    console.log("use effect navbar");
    console.log("hey");
    if (localStorage.getItem("token")) {

      let decodedToken = jwtDecode(localStorage.getItem("token")).data;
      const userName = decodedToken.username;
      setIsAdmin(decodedToken.isAdmin);
      
      // setIsAdmin(jwtDecode(localStorage.getItem("token").data.isAdmin));
      setLoginState(
        <>
          <UserMenu userName={userName} />
        </>
      );
    } else {
      setLoginState(
        <>
          <button onClick={() => changeUrl("signup")}>Sign Up</button>
          <button onClick={() => changeUrl("login")}>Log in</button>
        </>
      );
    }
    console.log(isLoggedIn);
    console.log(isAdmin);
  }, [localStorage.getItem('token')]);
  return (
    <nav className="main-nav">
      <ul>
        <li>
          {" "}
          <Link to="/questions">Questions</Link>
        </li>
        <li>
          {" "}
          <Link to="/users">Users</Link>
        </li>
        <li>
          {" "}
          <Link to="/tags">Tags</Link>
        </li>
        <li>{isAdmin && <Link to="/add-tags">Add Tag</Link>}</li>
      </ul>
      <div className="nav-button-group">{loginState}</div>
    </nav>
  );
}

export default Navbar;
