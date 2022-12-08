import react from "react";
import styled from "styled-components";
import "./QuestionCard-style.css";
import emptyUser from "../../assets/empty-user.png";
import {Navigate, useNavigate} from "react-router-dom";
export default function QuestionCard(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("clicked");
    navigate(`/question/${props.id}`);
  }
  return (
    <div className="question-card-container">
      <div className="question-card-stats">
        <p className="vote-count">0 votes</p>
        <p className="answer-count">0 answers</p>
        <p className="view-count">0 views</p>
      </div>
      <div className="question-card-title-container">
        <div className="question-card-title">
          <h3 onClick={handleClick}>
            <a> {props.title.length > 50 ? `${props.title.substring(0, 49)} ...`: props.title} </a>
          </h3>
          <div className="question-tags">
            <div className="question-tags-container">
              {props.tags.map((elem) => {
                return <a> {elem} </a>
              })}
            </div>
            <div className="user-info">
              <img alt="user" src={emptyUser}></img>
              <a> {props.author} </a>
              <span>asked {props.askedTime} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
