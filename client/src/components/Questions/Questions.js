import QuestionCard from "../QuestionCard/QuestionCard";
import "./Questions-style.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import saveQuestions from "../../helpers/save-questions";
import moment from "moment";

export default function Questions() {
  const navigate = useNavigate();
  const [questionsData, setQuestionsData] = useState([]);
  const [filterBy, setFilterBy] = useState('newest');
  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await axios.get("http://localhost:3001/getquestions");
      setQuestionsData(questions.data);
      saveQuestions(questions.data);
    };

    fetchQuestions();
    console.log("Get all questions");
    console.log(questionsData);
  }, []);

  const handleActive = () => {

  }

  const handleNewest = () => {
    const questions = localStorage.getItem('questions');
    setQuestionsData(JSON.parse(questions));
    setFilterBy('newest');
  }

  const handleUnanswered = () => {
    const unansweredQuestions = questionsData.filter((elem) => {
      return elem.answerList.length === 0;
    });
    setQuestionsData(unansweredQuestions);
    setFilterBy('unanswered');
  }

  const handleScore = () => {
    const questions = JSON.parse(localStorage.getItem('questions'));
    questions.sort((lhs, rhs) => {
      return rhs.votes - lhs.votes;
    });

    setQuestionsData(questions);
    setFilterBy('score');

  }
  return (
    
    <div className="questions-container">
      
      <div className="questions-header">
        <h1>All questions</h1>
        <button className="ask-button" onClick={() => navigate("/ask")}>
          Ask question
        </button>
      </div>
      <div className="questions-control">
        <p>{questionsData.length} questions </p>
        <div className="questions-filters">
          <button className="newest" style={{backgroundColor: `${filterBy === 'newest' ? "#FF2E63" : ""}`}} onClick={handleNewest}>
            Newest
          </button>
          <button className="active" style={{backgroundColor: `${filterBy === 'active' ? "#FF2E63" : ""}`}} onClick={handleActive}>
            Active
          </button>
          <button className="unanswered" style={{backgroundColor: `${filterBy === 'unanswered' ? "#FF2E63" : ""}`}} onClick={handleUnanswered}>
            Unanswered
          </button>
          <button className="score" style={{backgroundColor: `${filterBy === 'score' ? "#FF2E63" : ""}`}} onClick={handleScore}>
            Score
          </button>
        </div>
      </div>
      {questionsData.map((elem) => {
        return (
          <QuestionCard
            id={elem.id}
            title={elem.title}
            tags={elem.tags}
            author={elem.author}
            askedTime = {moment(elem.createdAt).fromNow()}
            votes={elem.votes}
            answersCount={elem.answerList.length}
            viewsCount={elem.viewsList.length}
          />
        );
      })}
      
    </div>
  );
}
