import React from "react";
import {BrowserRouter as Router, Link} from "react-router-dom"


function CardForm({ formData, handleSubmit, handleInputChange }) {
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="front"></label>
        Front
        <textarea
          type="text"
          name="front"
          id="front"
          value={formData.front}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="back"></label>
        Back
        <textarea
          type="text"
          name="back"
          id="back"
          value={formData.back}
          onChange={handleInputChange}
        ></textarea>
      </div>
      <Link to={"/"}><button>Done</button></Link>
      <button type="submit">Save</button>
    </form>
  );
}

export default CardForm;