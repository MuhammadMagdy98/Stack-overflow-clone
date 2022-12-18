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
  return (
    
    <div className="questions-container">
      <div className="questions-header">
        <h1>All questions</h1>
        <button className="ask-button" onClick={() => navigate("/ask")}>
          Ask question
        </button>
      </div>
      {questionsData.map((elem, index) => {
        return (
          <QuestionCard
            id={index + 1}
            title={elem.title}
            tags={elem.tags}
            author={elem.author}
            askedTime = {moment(elem.createdAt).fromNow()}
            votes={elem.votes}
            answersCount={elem.answerList.length}
          />
        );
      })}
      
    </div>
  );
}
