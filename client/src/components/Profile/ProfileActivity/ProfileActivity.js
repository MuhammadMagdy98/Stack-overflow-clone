import {Link} from "react-router-dom";
import "./ProfileActivity-style.css";
export default function ProfileActivity(props) {
  let menuItems = ['Summary', 'Answers', 'Questions', 'Tags', 'Votes'];
  return (
    <div className="profile-activity">
      <div className="activity-menu">
        {menuItems.map(elem => {
          return <Link to="#"> {elem} </Link>
        })}
      </div>
    </div>
  );
}