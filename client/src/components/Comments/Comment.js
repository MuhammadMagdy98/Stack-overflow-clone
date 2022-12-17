import "./Comment-style.css";
import moment from "moment"
export default function Comment(props) {
  return (
    <div className="comment-container">
      <div className="comment-body">
        <p> {props.body} </p>

        <div className="comment-body-aside">
          <span>
            <a href={props.url}>{props.username} at {moment(props.createdAt).format('lll')} </a>
          </span>
        </div>
      </div>
      <hr style={{height: '1px', }}></hr>
    </div>
  );
}
