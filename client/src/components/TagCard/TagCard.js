import "./TagCard-style.css";
export function TagCard(props) {
    return (
        <div className="tag-card-container">
            <a href="#" className="tag-card-name">
                {props.name}
            </a>

            <p>
              {props.description}  
            </p>


            <p> {props.numberOfAskedQuestions} questions </p>

        </div>
    );
}