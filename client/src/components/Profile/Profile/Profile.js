
import "./Profile-style.css";
import { Link } from "react-router-dom";
import ProfileStats from "../ProfileStats/ProfileStats";
import TopTags from "../TopTags/TopTags";
import TopPosts from "../TopPosts/TopPosts";
import ProfileHeader from "../ProfileHeader/ProfileHeader";


export default function Profile(props) {
  return (
    <div className="profile-container">
      <ProfileHeader/>
      <div className="profile-links-group">
        <Link className="profile-page-links profile-profile" to="#">
          Profile{" "}
        </Link>
        <Link className="profile-page-links profile-activity" to="#">
          Activity{" "}
        </Link>
        <Link className="profile-page-links profile-saves" to="#">
          Saves{" "}
        </Link>
        <Link className="profile-page-links profile-settings" to="#">
          Settings{" "}
        </Link>
      </div>
      <div className="profile-body">
        <div className="profile-left-side">
          <h2> Stats</h2>
          <ProfileStats
            reputation={100}
            answers={10}
            questions={15}
            reached={1005}
          />
        </div>
        <div className="profile-right-side">
          {props.about && (
            <div className="profile-about">
              <h2> About</h2>
              <p> {props.about} </p>
            </div>
          )}
          <TopTags/>
          <TopPosts/>
        </div>
      </div>
    </div>
  );
}
