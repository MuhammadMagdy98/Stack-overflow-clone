import "./Ask-style.css";
import { BiBold } from "react-icons/bi";
import { TagContext } from "../../helpers/Context";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { TagCard } from "../TagCard/TagCard";
import {Navigate, useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode"
import { LoginContext } from "../../helpers/Context";
import { toast, ToastContainer } from "react-toastify";


import "../Tags/Tags-style.css";

export default function Ask() {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState({ title: "", body: "", tags: [], token: "" });
  const [inputTag, setInputTag] = useState('');
  const [cards, setCards] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsLinks, setSelectedTagsLinks] = useState([]);
  const {isLoggedIn} = useContext(LoginContext);
  const handleAsk = async(event) => {
    event.preventDefault();
    try {
      console.log("positing:");
      console.log(formData);
      const response = await axios.post('http://localhost:3001/ask', formData);
      if (response) {
        navigate('/questions');
      }
    } catch(err) {

    }
  }
  const handleChange = (event) => {
    if (event.target.name === "tags") {
      let filteredTags = tags.filter((elem) => {
        return (
          elem.name.toLowerCase().includes(event.target.value.toLowerCase()) &&
          event.target.value && !selectedTags.includes(elem.name)
        );
        
      });
      console.log(filteredTags);
      setCards(
        filteredTags.map((elem) => {
          return (
           
            <TagCard
              name={elem.name}
              description={elem.description}
              updateTags={setSelectedTags}
              Tags={selectedTags}
              selectedTags={selectedTagsLinks}
              updateSelectedTags={setSelectedTags}
              setInputTag={setInputTag}
              cards={cards}
              setCards={setCards}
              setFormData={setFormData}
              formData={formData}
              tags={tags}
             
            />
           
          );
        })
      );
      setInputTag(event.target.value);
    }
    setFormData((state) => ({
      ...state,
      [event.target.name]: event.target.value,
      tags: selectedTags,
      token: localStorage.getItem("token")

    }));
    console.log(formData);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("You must login to ask a question", {
        position: toast.POSITION.TOP_CENTER,
        theme: "dark",
      });
      navigate('/login');
    }
    console.log("Hi Im fetching tags");
    const fetchTags = async () => {
      const tags = await axios.get("http://localhost:3001/tags");
      setTags(tags.data);
    };

    fetchTags();
  }, []);

  const handleClose = (e) => {
    console.log("closing");
    e.preventDefault();
    let removed = selectedTags.filter((elem) => {
      return !elem.includes(e.target.getAttribute('name'));
    });

    console.log(`removed = ${e.target.getAttribute('name')}`);
    setSelectedTags(removed);
  }
  useEffect(() => {
    setSelectedTagsLinks(
      selectedTags.map((elem, i) => {
        return <a name={elem} key={i} className="tag-link" title="c++">
         
          {elem}
          <span name={`${elem}`} title="remove tag" onClick={handleClose}>&#10005;</span>
        </a>;
      })
    );

  }, [selectedTags]);
  return (
    isLoggedIn &&
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
          <div className="question-body-utils"></div>

          <textarea
            onChange={handleChange}
            name="body"
            value={formData.body}
            className="question-body-text"
          ></textarea>

          <h2> Tags </h2>
          <p>Add up to 5 tags to describe what your question is about</p>
          <div className="tag-list">
            {selectedTagsLinks}
            <input
              onChange={handleChange}
              name="tags"
              value={inputTag}
              className="ask-question-tags"
              type="text"
            ></input>
          </div>
          {cards}
        </div>
      </div>
      <button className="ask-button" onClick={handleAsk}>Ask question</button>
      <ToastContainer/>
    </div>
  );
}
