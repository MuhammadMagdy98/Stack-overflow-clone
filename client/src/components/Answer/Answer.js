import DownArrow from "../../assets/caret-down-solid.svg";
import GreenArrow from "../../assets/caret-green.svg";
import RedArrow from "../../assets/caret-red.svg";
import { useState, useEffect } from "react";
import "../QuestionView/QuestionView-style.css";
import axios from "axios";
import moment from "moment";
import "./Answer-style.css";
import Comment from "../Comments/Comment";
import saveQuestions from "../../helpers/save-questions";
import updateVotesList from "../../helpers/update-voteslist";

function Answer(props) {
  const [voteCasted, setVoteCasted] = useState(false);
  const [voteCount, setVoteCount] = useState(props.votes);
  const [showCommentContainter, setShowCommentContainer] = useState(false);
  const [comment, setComment] = useState("");
  const [isUpVote, setIsUpvote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);

  const handleUpVote = async () => {
    const data = {
      questionId: props.id,
      voteValue: 1,
      token: localStorage.getItem("token"),
      answerId: props.answerId
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);
        updateVotesList(response.data.votesList);
        setIsUpvote(true);
        setIsDownVote(false);
      } else {
        setVoteCasted(false);
        updateVotesList(response.data.votesList);
        setIsUpvote(false);
        setIsDownVote(false);
      }
      setVoteCount(response.data.voteCount);
      setVoteCasted(!voteCasted);
    } else {
    }
  };

  const handleDownVote = async () => {
    const data = {
      questionId: props.id,
      voteValue: -1,
      token: localStorage.getItem("token"),
      answerId: props.answerId
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);
        setIsUpvote(false);
        setIsDownVote(true);
      } else {
        setVoteCasted(false);
        setIsUpvote(false);
        setIsDownVote(false);
      }
      setVoteCount(response.data.voteCount);
      setVoteCasted(!voteCasted);
    } else {
    }
  };

  const handleAddComment = () => {
    setShowCommentContainer(true);
  };
  const submitComment = async (e) => {
    const data = {
      username: localStorage.getItem("username"),
      body: comment,
      questionId: props.id,
      answerId: props.answerId,
    };
    const response = await axios.post("http://localhost:3001/addcomment", data);
    if (response.status === 201) {
      console.log(response.data);
      saveQuestions(response.data);

      setComment("");
      window.location.reload();
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
            src={!isUpVote ? DownArrow : GreenArrow}
            className="question-view-upvote"
            alt="up-vote"
            onClick={handleUpVote}
          ></img>
          <div className="question-view-vote-count">{voteCount}</div>

          <img
            src={!isDownVote ? DownArrow : RedArrow}
            className="question-view-downvote"
            alt="down-vote"
            onClick={handleDownVote}
          ></img>
        </div>
        <div className="question-body-content">
          <p> {props.body} </p>
        </div>
      </div>
      <div className="answer-stats-container">
        <p>
          answered by {props.author} at {moment(props.createdAt).format("lll")}
        </p>
      </div>
      {props.comments.map((elem) => {
        return (
          <Comment
            body={elem.body}
            url={"/"}
            username={elem.user}
            createdAt={elem.createdAt}
          />
        );
      })}
      {!showCommentContainter && (
        <a
          class="add-comment"
          onClick={handleAddComment}
          style={{ color: "hsl(206,100%,40%)" }}
        >
          {" "}
          Add a comment{" "}
        </a>
      )}
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
