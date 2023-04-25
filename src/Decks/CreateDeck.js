import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  NavLink,
} from "react-router-dom";
import { createDeck } from "../utils/api";


//ADD CONSOLE LOG TO TEST FORM DATA

function CreateDeck() {

  let defaultForm = {
    name: "",
    description: "",
  };

  let [formData, setFormData] = useState(defaultForm);

  function handleInput(event) {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target?.name]: event.target?.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createDeck(formData);
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
      <h1>THIS IS THE CREATE DECK PAGE</h1>
      asdfasdfasdf
      <form name="create">
        <label htmlFor="name" />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
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
        <NavLink to={`/deck/1`}>
          <button onClick={handleSubmit}>Submit</button>
        </NavLink>
      </div>
    </div>
  );
}

export default CreateDeck;
