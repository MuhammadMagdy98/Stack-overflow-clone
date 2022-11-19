import QuestionCard from "../QuestionCard/QuestionCard";
import "./Questions-style.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Questions() {
  const navigate = useNavigate();
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      const questions = await axios.get("http://localhost:3001/getquestions");
      setQuestionsData(questions.data);
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
      {questionsData.map((elem) => {
        return (
          <QuestionCard
            title={elem.title}
            tags={elem.tags}
            author={elem.author}
          />
        );
      })}
      
    </div>
  );
}
