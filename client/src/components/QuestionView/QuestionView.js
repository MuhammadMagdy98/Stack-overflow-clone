import { useState, useEffect } from "react";
import DownArrow from "../../assets/caret-down-solid.svg";
import GreenArrow from "../../assets/caret-green.svg";
import RedArrow from "../../assets/caret-red.svg";
import "./QuestionView-style.css";
import Comment from "../Comments/Comment";
import { useParams } from "react-router";
import axios from "axios";
import saveQuestions from "../../helpers/save-questions";
import updateVotesList from "../../helpers/update-voteslist";
import Answer from "../Answer/Answer";
import moment from "moment";
import pluralize from "../../helpers/pluralize";
import jwtDecode from "jwt-decode"

export default function QuestionView(props) {
  let { id } = useParams();
  id = parseInt(id) - 1;
  console.log(id);
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerList, setAnswerList] = useState([]);

  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    // const viewQuestion = async () => {
    //   const response = await axios.post(
    //     `http://localhost:3001/question/${id + 1}`
    //   );

    //   if (!response) {
    //   } else {
    //     console.log(response.data);
    //   }
    // };
    // viewQuestion();
    setQuestionData(JSON.parse(localStorage.getItem("questions")));
    setCurrentQuestion(JSON.parse(localStorage.getItem("questions"))[id]);
    setVoteCount(JSON.parse(localStorage.getItem("questions"))[id].votes);
    setAnswerList(JSON.parse(localStorage.getItem("questions"))[id].answerList);
    window.scrollTo(0, 0);
  }, []);

  const [isUpVote, setIsUpvote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);
  const userVotedBefore = () => {
    
    let votesList = jwtDecode(localStorage.getItem("token")).data.votesList;
    if (!votesList) {
      return false;
    }
    const voted = votesList.find((elem) => {
      return elem.isQuestionVote && elem.id === id + 1;
    });
    if (voted) {
      setIsUpvote(voted.voteValue === 1);
      setIsDownVote(voted.voteValue === -1);
    }
    return voted ? true : false;
  };



  const [voteCasted, setVoteCasted] = useState(userVotedBefore);

  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("");
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
      questionId: id + 1,
      voteValue: -1,
      token: localStorage.getItem("token"),
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);
        setIsUpvote(false);
        setIsDownVote(true);
        updateVotesList(response.data.votesList);
      } else {
        setVoteCasted(false);
        setIsUpvote(false);
        setIsDownVote(false);
        updateVotesList(response.data.votesList);
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

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const addAnswer = async () => {
    let data = {
      questionId: id + 1,
      body: answer,
      username: localStorage.getItem("username"),
    };
    let response = await axios.post("http://localhost:3001/answer", data);

    if (response) {
      setAnswerList(response.data);
      setCurrentQuestion({ ...currentQuestion, answerList: response.data });
      localStorage.setItem("answerList", response.data);
    } else {
      //TODO
    }

    setAnswer("");
  };

  const submitComment = async (e) => {
    const data = {
      token: localStorage.getItem("token"),
      body: comment,
      questionId: id + 1,
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
          <p> {currentQuestion && currentQuestion.body} </p>
        </div>
      </div>
      <div className="question-body-bottom">
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
        <p className="question-tags-aside">
          asked by {currentQuestion && currentQuestion.author} at{" "}
          {currentQuestion && moment(currentQuestion.createdAt).format("lll")}
        </p>
      </div>

      {currentQuestion &&
        currentQuestion.comments.map((elem) => {
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
          className="add-comment"
          onClick={handleAddComment}
          style={{ color: "hsl(206,100%,40%)" }}
        >
          {" "}
          Add a comment{" "}
        </a>
      )}
      {showCommentContainter && (
        <div className="add-comment-containter">
          <textarea
            className="comment-textarea"
            onChange={handleAddCommentChange}
            value={comment}
          >
            {" "}
          </textarea>
          <button className="add-comment-button" onClick={submitComment}>
            Add a comment
          </button>
        </div>
      )}
      <div style={{ margin: "40px 0px 20px 50px", fontSize: "20px" }}>
        {" "}
        {currentQuestion && pluralize("answer", currentQuestion.answerList.length)}
      </div>
      {answerList &&
        answerList.map((elem, index) => {
          return (
            <Answer
              votes={elem.votes}
              body={elem.body}
              id={id + 1}
              answerId={index + 1}
              createdAt={elem.createdAt}
              author={elem.author}
              comments={elem.comments}
            />
          );
        })}

      <div className="add-answer-container">
        <textarea
          className="answer-textarea"
          onChange={handleAnswerChange}
          value={answer}
        >
          {" "}
        </textarea>
        <button className="post-answer-button" onClick={addAnswer}>
          Post your answer
        </button>
      </div>
    </div>
  );
}
