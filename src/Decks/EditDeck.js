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
import { updateDeck } from "../utils/api";

function EditDeck({ deckList, buildDeckList }) {
  const { deckId } = useParams();
  const history = useHistory();

  let targetDeck = deckList.find((deck) => {
    return Number(deck.id) === Number(deckId);
  });


  let defaultForm = {
    name: "",
    description: "",
  };


  const [formData, setFormData] = useState(defaultForm);

  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    formData.id = targetDeck && targetDeck.id
    updateDeck(formData).then((res) => {
      buildDeckList();
      history.push(`/decks/${res.id}`);
    });
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{targetDeck && targetDeck.name}</Link>
          </li>
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
      <form name="create">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder={`${targetDeck && targetDeck.name}`}
          value={formData.name}
          onChange={handleInput}
        />
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder={`${targetDeck && targetDeck.description}`}
          value={formData.description}
          onChange={handleInput}
        />
      </form>
      <div>
        <NavLink to={`/decks/${deckId}`}>
          <button>Cancel</button>
        </NavLink>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default EditDeck;
