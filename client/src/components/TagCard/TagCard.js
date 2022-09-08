import "./TagCard-style.css";
import { TagContext } from "../../helpers/Context";
import React, { useContext, useState, useEffect } from "react";
export function TagCard(props) {
  const handleClick = (e) => {
    e.preventDefault();
    props.updateTags([...props.Tags, props.name]);
    props.setInputTag("");
    props.setCards()
  };
  return (
    <div className="tag-card-container">
      <a href="#" className="tag-card-name" onClick={handleClick}>
        {props.name}
      </a>

      <p>{props.description}</p>

      <p> {props.numberOfAskedQuestions} questions </p>
    </div>
  );
}
