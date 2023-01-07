import emptyUser from "../../../assets/empty-user.png";
import birthday from "../../../assets/birthday.svg";
import calendar from "../../../assets/calendar.svg";

import "./Profile-style.css";
import { Link } from "react-router-dom";
import ProfileStats from "../ProfileStats/ProfileStats";
import TopTags from "../TopTags/TopTags";
import TopPosts from "../TopPosts/TopPosts";

export default function Profile(props) {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-header-image"
          alt="profile"
          src={emptyUser}
        ></img>
        <div className="profile-header-info">
          <div className="profile-header-info-title">
            <h1> {localStorage.getItem("username")}</h1>
            <button className="edit-profile-button"> Edit profile </button>
          </div>
          <h2>Title </h2>
          <div className="dates-insights">
            <span>
              {" "}
              <img
                className="birthday-img"
                src={birthday}
                alt="birth"
              ></img>{" "}
              Member for 5 years, 3 months{" "}
            </span>
            <span>
              {" "}
              <img
                className="calendar-img"
                src={calendar}
                alt="calendar"
              ></img>{" "}
              Visited 1256 days, 6 consecutive{" "}
            </span>
          </div>
        </div>
      </div>
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
