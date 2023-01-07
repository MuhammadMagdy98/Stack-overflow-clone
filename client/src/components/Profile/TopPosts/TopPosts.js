import { Link } from "react-router-dom";
import TopTagsBody from "../TopTagsBody/TopTagsBody";
import "./TopPosts-style.css";
import TopPostsBody from "./TopPostsBody/TopPostsBody";
export default function TopPosts(props) {
  return (
    <div className="top-posts">
      <div className="top-posts-header">
        <h2> Top Posts</h2>
        <div className="top-posts-header-secondline">
          <div className="top-posts-header-secondline-left">
            <span>View all </span>
            <Link to="#" style={{ textDecoration: "none", color: "grey" }}>
              questions
            </Link>
            <span>, </span>
            <Link to="#" style={{ textDecoration: "none", color: "grey" }}>
              answers
            </Link>
          </div>
          <div className="top-posts-header-secondline-right">
            <div className="top-posts-navigations">
              <Link
                to="#"
                style={{
                  padding: "5px",
                  backgroundColor: "#263159",
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "6px",
                  margin: '2px'
                }}
              >
                All
              </Link>
              <Link
                to="#"
                style={{
                  padding: "5px",
                  backgroundColor: "#263159",
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "6px",
                  margin: "2px",
                }}
              >
                Questions
              </Link>
              <Link
                to="#"
                style={{
                  padding: "5px",
                  backgroundColor: "#263159",
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "6px",
                  margin: "2px",
                }}
              >
                Answers
              </Link>
            </div>
            <div>
              <Link
                to="#"
                style={{
                  padding: "5px",
                  backgroundColor: "#263159",
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "6px",
                  margin: "2px",
                }}
              >
                Score
              </Link>
              <Link
                to="#"
                style={{
                  padding: "5px",
                  backgroundColor: "#263159",
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "6px",
                  margin: "2px",
                }}
              >
                Newest
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="top-post-container">
        <TopPostsBody isQuestion={true} votesCount={10} title='How to sort array in C++?' time='Jun 25, 2021'/>
        <TopPostsBody isQuestion={false} votesCount={10} title='How to sort array in C++?' time='Jun 25, 2021' lastOne={true}/>
      </div>
    </div>
  );
}
