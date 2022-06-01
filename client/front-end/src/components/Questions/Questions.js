import QuestionCard from "../QuestionCard/QuestionCard";
import "./Questions-style.css";
export default function Questions() {
  return (
  <div className="questions-container">
      <div className="questions-header">
      <h1>All questions</h1>
      <button className="ask-button">
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
