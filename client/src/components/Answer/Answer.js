import DownArrow from "../../assets/caret-down-solid.svg";
import { useState, useEffect } from "react";
import "../QuestionView/QuestionView-style.css";
import axios from "axios";

function Answer(props) {
  const [voteCasted, setVoteCasted] = useState(false);
  const [voteCount, setVoteCount] = useState(props.votes);
  const [showCommentContainter, setShowCommentContainer] = useState(false);
  const [comment, setComment] = useState("");

  const handleUpVote = () => {
    if (!voteCasted) setVoteCount(props.votes + 1);
    else setVoteCount(props.votes);
    setVoteCasted(!voteCasted);
  };

  const handleDownVote = () => {
    if (!voteCasted) setVoteCount(props.votes - 1);
    else setVoteCount(props.votes);
    setVoteCasted(!voteCasted);
  };

  const handleAddComment = () => {
    setShowCommentContainer(true);
  };
  const submitComment = async (e) => {
    const data = {

      username: localStorage.getItem("username"),
      body: comment,
      id: props.id,
    };
    const response = await axios.post("http://localhost:3001/addcomment", data);
    if (response.status === 201) {
      console.log(response.data);
      // saveQuestions(response.data);
      // const items = JSON.parse(localStorage.getItem("questions"));
      // setQuestionData(items);

      // setCurrentQuestion(items[id]);

      // setVoteCount(items[id].votes);
      // setComment("");
    }
  };
  const handleAddCommentChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <>
      <div className="question-view-body">
        <div className="question-view-score">
          <img
            src={DownArrow}
            className="question-view-upvote"
            alt="up-vote"
            onClick={handleUpVote}
          ></img>
          <div className="question-view-vote-count">{voteCount}</div>

          <img
            src={DownArrow}
            className="question-view-downvote"
            alt="down-vote"
            onClick={handleDownVote}
          ></img>
        </div>
        <div className="question-body-content">
          <p> {props.body} </p>
        </div>
      </div>
      {
        !showCommentContainter &&
        <a
          class="add-comment"
          onClick={handleAddComment}
          style={{ color: "#0000EE" }}
        >
          {" "}
          Add a comment{" "}
        </a>
      }
      {showCommentContainter && (
        <div class="add-comment-containter">
          <textarea
            class="comment-textarea"
            onChange={handleAddCommentChange}
            value={comment}
          >
            {" "}
          </textarea>
          <button class="add-comment-button" onClick={submitComment}>
            Add a comment
          </button>
        </div>
      )}
    </>
  );
}

export default Answer;
