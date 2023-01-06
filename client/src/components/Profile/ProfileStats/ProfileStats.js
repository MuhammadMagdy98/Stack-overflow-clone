import "./ProfileStats-style.css";
export default function ProfileStats(props) {
  return (
    <div className="stats">
      <div className="stats-items stats-reputation">
        <div className="stats-reputation-number"> {props.reputation} </div>
        <p>reputation</p>
      </div>

      <div className="stats-items stats-reached">
        <div className="stats-reputation-number"> {props.reached} </div>
        <p>reached</p>
      </div>
      <div className="stats-items stats-answers">
        <div className="stats-reputation-number"> {props.answers} </div>
        <p>answers</p>
      </div>

      <div className="stats-items stats-questions">
        <div className="stats-reputation-number"> {props.questions} </div>
        <p>questions</p>
      </div>




    </div>
  );
}
