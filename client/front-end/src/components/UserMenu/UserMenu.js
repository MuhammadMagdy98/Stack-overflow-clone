import "./UserMenu-style.css";
import DownArrow from "../../assets/caret-down-solid.svg";
import { useState, useContext} from "react";
import {
   
    useNavigate
} from "react-router-dom";
// import { LoginContext } from "../../helpers/Context";
import { LoginContext } from "../../helpers/Context";

export default function UserMenu(props) {
    const { setUsername, setIsLoggedIn, username } = useContext(LoginContext);

    let navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [menuClassName, setMenuClassName] = useState('user-menu-options-invisible');

    const handleLogOut = () => {

        localStorage.clear();
        setIsLoggedIn(false);
        setUsername('');
        navigate('/');
    }
    const handleShowMenu = (event) => {
        console.log("clicked");
        
        if (!showMenu) {
            setMenuClassName('user-menu-options-visible');
        } else {
            setMenuClassName('user-menu-options-invisible');
        }
        setShowMenu(!showMenu);
        
    }
  return (
    <>
      {props.userName}
      <img src={DownArrow} className="down-arrow" alt="down-arrow" onClick={handleShowMenu}></img>
      <ul className={menuClassName}>
        <li>Account Settings</li>
        <li>Profile</li>

        <li onClick={handleLogOut}>Logout</li>
      </ul>
    </>
  );
}
