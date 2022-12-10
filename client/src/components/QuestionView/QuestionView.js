import { useState, useEffect } from "react";
import DownArrow from "../../assets/caret-down-solid.svg";
import "./QuestionView-style.css";
import Comment from "../Comments/Comment";
import { useParams } from "react-router";
import axios from "axios";
import saveQuestions from "../../helpers/save-questions";
import Answer from "../Answer/Answer";

export default function QuestionView(props) {
  let { id } = useParams();
  id = parseInt(id) - 1;
  console.log(id);
  const [questionData, setQuestionData] = useState(null);
  const [number, forceRender] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    setQuestionData(JSON.parse(localStorage.getItem("questions")));
    setCurrentQuestion(JSON.parse(localStorage.getItem("questions"))[id]);
    setVoteCount(JSON.parse(localStorage.getItem("questions"))[id].votes);
    window.scrollTo(0, 0);
  }, []);

  const [voteCasted, setVoteCasted] = useState(false);
  const [comment, setComment] = useState("");
  const handleUpVote = async () => {
    const data = {
      questionId: id + 1,
      voteValue: 1,
      token: localStorage.getItem("token"),
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);
      } else {
        setVoteCasted(false);
      }
      setVoteCount(response.data.voteCount);
      setVoteCasted(!voteCasted);
    } else {
    }
  };

  const handleDownVote = async () => {
    const data = {
      questionId: id + 1,
      voteValue: -1,
      token: localStorage.getItem("token"),
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);
      } else {
        setVoteCasted(false);
      }
      setVoteCount(response.data.voteCount);
      setVoteCasted(!voteCasted);
    } else {
    }
  };

  const handleAddComment = () => {
    setShowCommentContainer(true);
  };

  const handleAddCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async (e) => {
    const data = {
      username: localStorage.getItem("username"),
      body: comment,
      id: id + 1,
    };
    const response = await axios.post("http://localhost:3001/addcomment", data);
    if (response.status === 201) {
      console.log(response.data);
      saveQuestions(response.data);
      const items = JSON.parse(localStorage.getItem("questions"));
      setQuestionData(items);

      setCurrentQuestion(items[id]);

      setVoteCount(items[id].votes);
      setComment("");
    }
  };

  const [showCommentContainter, setShowCommentContainer] = useState(false);

  return (
    <div className="question-view-container">
      <div className="question-view-title">
        <h2> {currentQuestion && currentQuestion.title} </h2>
      </div>
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
          <p> {currentQuestion && currentQuestion.body} </p>
        </div>
      </div>

      <div className="question-view-tags">
        {currentQuestion &&
          currentQuestion.tags.map((elem) => {
            return (
              <a className="question-view-tag-child" href={elem}>
                {" "}
                {elem}
              </a>
            );
          })}
      </div>

      {currentQuestion &&
        currentQuestion.comments.map((elem) => {
          return <Comment body={elem.body} url={"/"} username={elem.user} />;
        })}
      {!showCommentContainter && (
        <a
          class="add-comment"
          onClick={handleAddComment}
          style={{ color: "#0000EE" }}
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
      <Answer votes={0} body={"Test Test Test Test"} />

      <div class="add-answer-container">
        <textarea class="answer-textarea"> </textarea>
        <button class="post-answer-button">Post your answer</button>
      </div>
    </div>
  );
}
