import "./Comment-style.css";
export default function Comment(props) {
  return (
    <div className="comment-container">
      <div className="comment-body">
        <p> {props.body} </p>

        <div className="comment-body-aside">
          <span>
            <a href={props.url}>{props.username}</a>
          </span>
        </div>
      </div>
      <hr style={{height: '1px', }}></hr>
    </div>
  );
}
