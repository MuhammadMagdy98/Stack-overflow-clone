import './Ask-style.css';
import {BiBold} from 'react-icons/bi';
export default function Ask() {
  return (
    <div className="question-wrapper">
      <h1>Ask a question</h1>
      <div className="question-container">
        <h2>Title</h2>
        <p>Be specific and imagine you're asking another person</p>
        <input
          type="text"
          className="question-title"
          placeholder="Why processing sorted arrays are faster than unsorted ones?"
        ></input>

        <h2>Body</h2>
        <p>
          Include all the information someone would need to answer your question
        </p>
        <div className="question-body-container">
          <div className="question-body-utils">
            
          </div>

          <textarea className="question-body-text"></textarea>

          <h2> Tags </h2>
          <p>Add up to 5 tags to describe what your question is about</p>

          <input className="ask-question-tags" type="text"></input>
        </div>
      </div>
      <button className="ask-button">
          Ask question
      </button>
    </div>
  );
}
