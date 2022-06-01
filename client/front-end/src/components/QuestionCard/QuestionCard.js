import react from "react";
import styled from "styled-components";
import "./QuestionCard-style.css";
import emptyUser from "../../assets/empty-user.png";
export default function QuestionCard(props) {
  return (
    <div className="question-card-container">
      <div className="question-card-stats">
        <p className="vote-count">0 votes</p>
        <p className="answer-count">0 answers</p>
        <p className="view-count">0 views</p>
      </div>
      <div className="question-card-title-container">
        <div className="question-card-title">
          <h3>
            <a>Why processing sorted array is faster than unsorted array? </a>
          </h3>
          <div className="question-tags">
            <div className="question-tags-container">
              <a>tag1</a>
              <a>tag1</a>
              <a>tag1</a>
            </div>
            <div className="user-info">
            
              <img alt="user" src={emptyUser}></img>
              <a>userx </a>
              <span>asked 3 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
