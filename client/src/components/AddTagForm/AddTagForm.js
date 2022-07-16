import "./AddTagForm-style.css";
import { useState } from "react";
import axios from "axios";
export function AddTagForm() {
  const [formData, setFormData] = useState({ name: "", description: "", token: localStorage.getItem("token") });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
          "http://localhost:3001/add-tag",
          formData
        );
        console.log(response.status);
  
        
      } catch (err) {
        console.log(err);
      }
  };

  const handleChange = (e) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };
  return (
    <div className="add-tag-form-container">
      <form className="add-tag-form" onSubmit={handleSubmit}>
        <label>Tag name</label>
        <input
          className="add-tag-name"
          name="name"
          value={formData.name}
          placeholder="Enter tag name"
          onChange={handleChange}
        ></input>
        <label>Tag description</label>
        <textarea
          className="add-tag-name"
          name="description"
          value={formData.description}
          placeholder="Enter tag description"
          onChange={handleChange}
        ></textarea>

        <button type= "submit" className="add-tag-button">
            Add Tag
        </button>
      </form>
    </div>
  );
}
