import './Navbar-style.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const hisory = useNavigate();
  return (
    <nav className="main-nav">
      <ul>
          <li> <a href="questions">Questions</a></li>
          <li> <a href="users">Users</a></li>
          <li> <a href="tags">Tags</a></li>
      </ul>
      <div className="nav-button-group">
          <button onClick={() => hisory('/singup')}>Sign Up</button>
          <button onClick={() => hisory('/login')}>Log in</button>
      </div>
    </nav>
  );
}

export default Navbar;
