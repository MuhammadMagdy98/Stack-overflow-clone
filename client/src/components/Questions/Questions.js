import QuestionCard from "../QuestionCard/QuestionCard";
import "./Questions-style.css";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import saveQuestions from "../../helpers/save-questions";
import moment from "moment";

export default function Questions() {
  let linkStyle = {
    textDecoration: "none",
    padding: "8px",
    margin: "2px",
    borderRadius: "6px",
    backgroundColor: "#263159",
    color: "white",
  };

  const navigate = useNavigate();
  const [questionsData, setQuestionsData] = useState([]);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(15);
  const [filterBy, setFilterBy] = useState("newest");
  useEffect(() => {
    const params = {
      tab: filterBy,
      page: currentPage,
      perpage: questionsPerPage,
    };
    const options = {
      pathname: "/questions",
      search: `?${createSearchParams(params)}`,
    };
    navigate(options, { replace: true });
    const fetchQuestions = async () => {
      // const questions = await axios.get("http://localhost:3001/getquestions");
      const questions = await axios.get(
        `http://localhost:3001/questions?${createSearchParams(params)}`
      );
      setQuestionsData(questions.data.questions);
      console.log(questions.data.questions);
      setQuestionsCount(questions.data.questionsCount);
      setPageCount(Math.ceil(questions.data.questionsCount / questionsPerPage));
    };
    fetchQuestions();
  }, [currentPage, filterBy, questionsPerPage]);
  const handlePageClick = (e) => {
    e.preventDefault();
    setCurrentPage(e.target.name);
    console.log(e.target.name);
  };
  const [pagesData, setPagesData] = useState([]);
  useEffect(() => {
    let toRender = [];
    if (currentPage < 5) {
      for (let i = 2; i <= Math.min(pageCount - 1, 5); i++) {
        toRender.push(
          <Link
            key={i}
            to="#"
            style={{
              ...linkStyle,
              backgroundColor:
                currentPage == i ? "rgb(255, 46, 99)" : "#263159",
            }}
            name={i}
            onClick={handlePageClick}
          >
            {i}
          </Link>
        );
      }
    } else {
      for (let i = currentPage - 2; i <= Math.min(currentPage + 2, pageCount - 1); i++) {
        toRender.push(
          <Link
            key={i}
            to="#"
            style={{
              ...linkStyle,
              backgroundColor:
                currentPage == i ? "rgb(255, 46, 99)" : "#263159",
            }}
            name={i}
            onClick={handlePageClick}
          >
            {i}
          </Link>
        );
      }
    }
    setPagesData(toRender);
  }, [pageCount, currentPage]);

  const handleActive = () => {};

  const handleNewest = () => {
    setFilterBy("newest");
    setCurrentPage(1);
  };

  const handleUnanswered = () => {
    setFilterBy("unanswered");
    setCurrentPage(1);
  };

  const handleScore = () => {
    setFilterBy("score");
    setCurrentPage(1);
  };
  return (
    <div className="questions-container">
      <div className="questions-header">
        <h1>All questions</h1>
        <button className="ask-button" onClick={() => navigate("/ask")}>
          Ask question
        </button>
      </div>
      <div className="questions-control">
        <p>{questionsCount} questions </p>
        <div className="questions-filters">
          <button
            className="newest"
            style={{
              backgroundColor: `${filterBy === "newest" ? "#FF2E63" : ""}`,
            }}
            onClick={handleNewest}
          >
            Newest
          </button>
          <button
            className="active"
            style={{
              backgroundColor: `${filterBy === "active" ? "#FF2E63" : ""}`,
            }}
            onClick={handleActive}
          >
            Active
          </button>
          <button
            className="unanswered"
            style={{
              backgroundColor: `${filterBy === "unanswered" ? "#FF2E63" : ""}`,
            }}
            onClick={handleUnanswered}
          >
            Unanswered
          </button>
          <button
            className="score"
            style={{
              backgroundColor: `${filterBy === "score" ? "#FF2E63" : ""}`,
            }}
            onClick={handleScore}
          >
            Score
          </button>
        </div>
      </div>
      {questionsData.map((elem, i) => {
        return (
          <QuestionCard
            key={i}
            id={elem.id}
            title={elem.title}
            tags={elem.tags}
            author={elem.author}
            askedTime={moment(elem.createdAt).fromNow()}
            votes={elem.votes}
            answersCount={elem.answerList.length}
            viewsCount={elem.viewsList.length}
          />
        );
      })}
      <div className="questions-pagination">
        <div className="pages">
          {currentPage > 1 && (
            <Link
              to="#"
              style={linkStyle}
              onClick={() =>
                setCurrentPage((prevPage) => parseInt(prevPage) - 1)
              }
            >
              Prev
            </Link>
          )}
          {
            <Link
              to="#"
              style={{
                ...linkStyle,
                backgroundColor:
                  currentPage == 1 ? "rgb(255, 46, 99)" : "#263159",
              }}
              name={1}
              onClick={handlePageClick}
            >
              1
            </Link>
          }
          {pagesData}
          {
            <Link
              to="#"
              style={{
                ...linkStyle,
                backgroundColor:
                  currentPage == pageCount ? "rgb(255, 46, 99)" : "#263159",
              }}
              name={pageCount}
              onClick={handlePageClick}
            >
              {pageCount}
            </Link>
          }
          {currentPage < pageCount && (
            <Link
              to="#"
              style={linkStyle}
              onClick={() =>
                setCurrentPage((prevPage) => parseInt(prevPage) + 1)
              }
            >
              Next
            </Link>
          )}
        </div>
        <div className="per-page">
          <span>Per page</span>
          <Link
            to="#"
            style={{
              ...linkStyle,
              backgroundColor:
                questionsPerPage === 15 ? "rgb(255, 46, 99)" : "",
            }}
            onClick={() => {
              setQuestionsPerPage(15);
              setCurrentPage(1);
            }}
          >
            15
          </Link>
          <Link
            to="#"
            style={{
              ...linkStyle,
              backgroundColor:
                questionsPerPage === 30 ? "rgb(255, 46, 99)" : "",
            }}
            onClick={() => {
              setQuestionsPerPage(30);
              setCurrentPage(1);
            }}
          >
            30
          </Link>
          <Link
            to="#"
            style={{
              ...linkStyle,
              backgroundColor:
                questionsPerPage === 50 ? "rgb(255, 46, 99)" : "",
            }}
            onClick={() => {
              setQuestionsPerPage(50);
              setCurrentPage(1);
            }}
          >
            50
          </Link>
        </div>
      </div>
    </div>
  );
}
