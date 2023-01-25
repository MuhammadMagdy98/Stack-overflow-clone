import emptyUser from "../../../assets/empty-user.png";
import birthday from "../../../assets/birthday.svg";
import calendar from "../../../assets/calendar.svg";
import "./ProfileHeader-style.css";

export default function ProfileHeader(props) {
  return (
    <div className="profile-header">
      <img className="profile-header-image" alt="profile" src={emptyUser}></img>
      <div className="profile-header-info">
        <div className="profile-header-info-title">
          <h1> {localStorage.getItem("username")}</h1>
          <button className="edit-profile-button"> Edit profile </button>
        </div>
        <h2>Title </h2>
        <div className="dates-insights">
          <span>
            {" "}
            <img className="birthday-img" src={birthday} alt="birth"></img>{" "}
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
  );
}
