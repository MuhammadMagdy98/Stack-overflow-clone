import { Link } from "react-router-dom";
import "./TopPostsBody-style.css";
import QuestionIcon from "../../../../assets/question-icon.svg";
import AnswerIcon from "../../../../assets/answer-icon.svg";

export default function TopPostsBody(props) {
  let borderBottom = (props.lastOne === true ? 'none' : '1px solid white');
  return (
    <div className="top-posts-body" style={{borderBottom: borderBottom}}>
      <img
        src={props.isQuestion === true ? QuestionIcon : AnswerIcon}
        alt="icon"
      ></img>
      <div className="top-posts-votes-count"> {props.votesCount} </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          to="#"
          style={{ textDecoration: "none", color: "hsl(206,100%,40%)" }}
        >
          {props.title}{" "}
        </Link>
        <p> {props.time} </p>
      </div>
    </div>
  );
}
