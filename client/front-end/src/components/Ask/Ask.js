import './Ask-style.css';
import {BiBold} from 'react-icons/bi';
import { TagContext } from '../../helpers/Context';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { TagCard } from '../TagCard/TagCard';
import "../Tags/Tags-style.css";

export default function Ask() {
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({title: '', body: '', tags: []});
  const [cards, setCards] = useState('');
  const handleChange = (event) => {
    if (event.target.name === "tags") {
      let filteredTags = tags.filter((elem) => {
        return elem.name.toLowerCase().includes(event.target.value) && event.target.value;
      });
      console.log(filteredTags);
      setCards(filteredTags.map((elem) => {
        return <TagCard name={elem.name} description={elem.description}/>
      }));
    }
    setFormData((state) => ({...state, [event.target.name] : event.target.value}))
  }
  useEffect(() => {

    console.log("Hi Im fetching tags");
    const fetchTags = async() => {
        const tags = await axios.get('http://localhost:3001/tags');
        setTags(tags.data);
    }

    fetchTags();
}, []);
  return (
    <div className="question-wrapper">
      <h1>Ask a question</h1>
      <div className="question-container">
        <h2>Title</h2>
        <p>Be specific and imagine you're asking another person</p>
        <input
          type="text"
          name="title"
          className="question-title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Why processing sorted arrays are faster than unsorted ones?"
        ></input>

        <h2>Body</h2>
        <p>
          Include all the information someone would need to answer your question
        </p>
        <div className="question-body-container">
          <div className="question-body-utils">
            
          </div>

          <textarea onChange={handleChange} name="body" value={formData.body} className="question-body-text"></textarea>

          <h2> Tags </h2>
          <p>Add up to 5 tags to describe what your question is about</p>

          <input onChange={handleChange} name="tags" value={formData.tags} className="ask-question-tags" type="text"></input>
          {cards}
        </div>
      </div>
      <button className="ask-button">
          Ask question
      </button>
    </div>
  );
}
