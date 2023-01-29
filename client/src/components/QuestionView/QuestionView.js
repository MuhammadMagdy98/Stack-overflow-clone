import { useState, useEffect, useContext} from "react";
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
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../../helpers/Context";

export default function QuestionView(props) {
  let { id } = useParams();
  id = parseInt(id);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerList, setAnswerList] = useState([]);
  const {isLoggedIn} = useContext(LoginContext);
  const [voteCount, setVoteCount] = useState(0);
  useEffect(() => {
    const viewQuestion = async () => {
      const response = await axios.post(`http://localhost:3001/question/${id}`);

      if (!response) {
      } else {
        console.log(response.data);
        setCurrentQuestion(response.data.question);
        setVoteCount(response.data.question.votes);
        setAnswerList(response.data.question.answerList);
      }
    };
    viewQuestion();
    window.scrollTo(0, 0);
  }, []);

  const [isUpVote, setIsUpvote] = useState(false);
  const [isDownVote, setIsDownVote] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      let votesList = jwtDecode(localStorage.getItem("token")).data.votesList;
      const voted = votesList.find((elem) => {
        return elem.isQuestionVote && elem.id === id;
      });
      if (voted) {
        setIsUpvote(voted.voteValue === 1);
        setIsDownVote(voted.voteValue === -1);
        setVoteCasted(true);
      }
    } else {
      console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh");
    }
  }, []);

  const [voteCasted, setVoteCasted] = useState(false);

  const [comment, setComment] = useState("");
  const [answer, setAnswer] = useState("");
  const handleUpVote = async () => {
    if (!isLoggedIn) {
      toast.info("You must login to login to upvote", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      return;
    }
    const data = {
      questionId: id,
      voteValue: 1,
      token: localStorage.getItem("token"),
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);

        // updateVotesList(response.data.votesList);
        setIsUpvote(true);
        setIsDownVote(false);
      } else {
        setVoteCasted(false);
        // updateVotesList(response.data.votesList);
        setIsUpvote(false);
        setIsDownVote(false);
      }
      localStorage.setItem("token", response.data.token);
      setVoteCount(response.data.voteCount);
      setVoteCasted(!voteCasted);
    } else {
    }
  };

  const handleDownVote = async () => {
    if (!isLoggedIn) {
      toast.info("You must login to login to downvote", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      return;
    }
    const data = {
      questionId: id,
      voteValue: -1,
      token: localStorage.getItem("token"),
    };
    const response = await axios.post("http://localhost:3001/vote", data);
    if (response) {
      if (response.data.state === "done") {
        setVoteCasted(true);
        setIsUpvote(false);
        setIsDownVote(true);
        // updateVotesList(response.data.votesList);
      } else {
        setVoteCasted(false);
        setIsUpvote(false);
        setIsDownVote(false);
        // updateVotesList(response.data.votesList);
      }
      setVoteCount(response.data.voteCount);
      setVoteCasted(!voteCasted);
      localStorage.setItem("token", response.data.token);
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
    if (!isLoggedIn) {
      toast.info("You must login to post an answer", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      return;
    }
    let data = {
      questionId: id,
      body: answer,
      token: localStorage.getItem("token"),
    };
    let response = await axios.post("http://localhost:3001/answer", data);

    if (response) {
      setAnswerList(response.data);
      setCurrentQuestion({ ...currentQuestion, answerList: response.data });
    } else {
      //TODO
    }

    setAnswer("");
  };

  const submitComment = async (e) => {
    if (!isLoggedIn) {
      toast.info("You must login to add a comment", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
    }
    const data = {
      token: localStorage.getItem("token"),
      body: comment,
      questionId: id,
    };
    const response = await axios.post("http://localhost:3001/addcomment", data);
    if (response.status === 201) {
      console.log(response.data.question);
      setCurrentQuestion(response.data.question[0]);
      setVoteCount(response.data.question[0].votes);
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
            currentQuestion.tags.map((elem, i) => {
              return (
                <a className="question-view-tag-child" href={elem} key={i}>
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
        currentQuestion.comments.map((elem, i) => {
          return (
            <Comment
              key={i}
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
        {currentQuestion &&
          pluralize("answer", currentQuestion.answerList.length)}
      </div>
      {answerList &&
        answerList.map((elem, index) => {
          return (
            <Answer
              key={index}
              votes={elem.votes}
              body={elem.body}
              id={id}
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
      <ToastContainer/>
    </div>
  );
}
