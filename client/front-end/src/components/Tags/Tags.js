import "./Tags-style.css";

import { TagCard } from "../TagCard/TagCard";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TagContext } from "../../helpers/Context";


export function Tags() {
    const {tags, setTags} = useContext(TagContext);

    const [questionTags, setQuestionTags] = useState([{name: '', description: '', numberOfAskedQuestions: 0}]);
    useEffect(() => {

        console.log("Hi Im fetching tags");
        const fetchTags = async() => {
            const tags = await axios.get('http://localhost:3001/tags');
            setTags(tags.data);
        }

        fetchTags();
    }, []);

    const TagCards = questionTags.map((elem) => {
        return <TagCard name={elem.name} description={elem.description} numberOfAskedQuestions = {elem.numberOfAskedQuestions} />
    });
    return (
        <div className="all-tags-container">
            {TagCards}

        </div>
    );
}