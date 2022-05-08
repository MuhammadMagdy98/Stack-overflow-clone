import './Navbar-style.css';

function Navbar() {
  return (
    <nav className="main-nav">
      <ul>
          <li> <a href="#">Questions</a></li>
          <li> <a href="#">Users</a></li>
          <li> <a href="#">Tags</a></li>
      </ul>
      <div className="nav-button-group">
          <button>Sign Up</button>
          <button>Log in</button>
      </div>
    </nav>
  );
}

export default Navbar;
