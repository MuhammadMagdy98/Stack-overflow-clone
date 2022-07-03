import { useState } from "react";
import DownArrow from "../../assets/caret-down-solid.svg";
import "./QuestionView-style.css";
import Comment from "../Comments/Comment";

export default function QuestionView(props) {


  let tags;
  tags = props.tags.map((elem) => {
    return <a className="question-view-tag-child" href={elem.url}> {elem.name}</a>
  });
  const [voteCount, setVoteCount] = useState(0);

  const handleUpVote = () => {
    setVoteCount(voteCount + 1);
  };

  const handleDownVote = () => {
    setVoteCount(voteCount - 1);
  }


  return (
    <div className="question-view-container">
      <div className="question-view-title">
        <h2> {"Hello"} </h2>
      </div>
      <hr></hr>
      <div className="question-view-body">
        <div className="question-view-score">
          <img
            src={DownArrow}
            className="question-view-upvote"
            alt="up-vote"
            onClick={handleUpVote}
          ></img>
          <div className="question-view-vote-count">{voteCount}</div>

          <img
            src={DownArrow}
            className="question-view-downvote"
            alt="down-vote"
            onClick={handleDownVote}
          ></img>
          
        </div>
        <div className="question-body-content">
            <p>
                adasdasdasdasd
            </p>
        </div>
      </div>
       
      <div className="question-view-tags">
        {tags}
      </div>


      <Comment body={'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'} url={"/"} username = {'na7o'}/>
      <Comment body={'Why are you gay?'} url={"/"} username = {'na7o'}/>
      <Comment body={'Why are you gay?'} url={"/"} username = {'na7o'}/>

    </div>
  );
}
