import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  NavLink,
} from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck({ buildDeckList }) {
  const history = useHistory();

  let defaultForm = {
    name: "",
    description: "",
  };

  let [formData, setFormData] = useState(defaultForm);

  function handleInput(event) {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createDeck(formData).then((res) => {
      buildDeckList();
      history.push(`/decks/${res.id}`);
    });
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">New Deck</li>
          </ol>
        </nav>
      </div>
      <h1>Create Deck</h1>
      <form name="create">
        <label htmlFor="name" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder={"Name"}
          value={formData.name}
          onChange={handleInput}
        />
        <label htmlFor="description" />
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInput}
        />
      </form>
      <div>
        <NavLink to={`/`}>
          <button>Cancel</button>
        </NavLink>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default CreateDeck;
