import QuestionCard from "../QuestionCard/QuestionCard";
import "./Questions-style.css";
import { useNavigate } from "react-router";
export default function Questions() {
  const navigate = useNavigate();
  return (
  <div className="questions-container">
      <div className="questions-header">
      <h1>All questions</h1>
      <button className="ask-button" onClick={() => navigate('/ask')}>
          Ask question
      </button>
     
      </div>
      <QuestionCard/>
      <QuestionCard/>
      <QuestionCard/>
      <QuestionCard/>
      <QuestionCard/>
      <QuestionCard/>
      
  </div>
   
  );
}
