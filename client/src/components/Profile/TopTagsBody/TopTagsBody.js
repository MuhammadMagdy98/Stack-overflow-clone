import {Link} from "react-router-dom";
import "./TopTagsBody-style.css";

export default function TopTagsBody(props) {
  let borderBottom = props.lastOne === true ? "none" : "1px solid white";
  return (
    <div className="profile-top-tags-body" style={{borderBottom: borderBottom}}>
      <Link
        to="#"
        style={{
          textDecoration: "none",
          backgroundColor: "grey",
          borderRadius: "7px",
          padding: "3px 13px",
          margin: "5px",
          color: "white",
        }}
      >
        {props.tagName}
      </Link>
      <div style={{ display: "flex" }}>
        <div className="top-tags-div-right">
          {props.tagScore} <span style={{ color: "grey" }}>score</span>
        </div>{" "}
        <div className="top-tags-div-right">
          {props.tagTotalPosts} <span style={{ color: "grey" }}>posts</span>
        </div>{" "}
        <div className="top-tags-div-right">
          {`${props.tagPercent}%`} <span style={{ color: "grey" }}>posts</span>
        </div>
      </div>
    </div>
  );
}
