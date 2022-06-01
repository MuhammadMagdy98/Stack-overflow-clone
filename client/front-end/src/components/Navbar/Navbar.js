import './Navbar-style.css';
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";


function Navbar() {
  let navigate = useNavigate();
  function changeUrl(url) {
    navigate(`/${url}`);
  }
  return (
    <nav className="main-nav">
      <ul>
          <li> <a href="questions">Questions</a></li>
          <li> <a href="users">Users</a></li>
          <li> <a href="tags">Tags</a></li>
      </ul>
      <div className="nav-button-group">
          <button onClick={() => changeUrl('signup')}>Sign Up</button>
          <button onClick={() => changeUrl('login')}>Log in</button>
      </div>
    </nav>
  );
}

export default Navbar;
