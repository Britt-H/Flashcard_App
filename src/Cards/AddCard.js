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
import { createCard } from "../utils/api";

function AddCard({ deckList, buildDeckList }) {
  const { deckId } = useParams();
  const history = useHistory();

  let defaultForm = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  let targetDeck = deckList.find((deck) => {
    return Number(deck.id) === Number(deckId);
  });

  function handleInput(event) {
    setFormData({
      ...formData,
      [event.target?.name]: event.target?.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    createCard(Number(deckId), formData).then(() => {
      buildDeckList();
      history.push(`/decks/${deckId}`);
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
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{targetDeck?.name}</Link>
            </li>
            <li className="breadcrumb-item">Add Card</li>
          </ol>
        </nav>
      </div>
      <form name="create">
        <label htmlFor="front" />
        <textarea
          type="text"
          id="front"
          name="front"
          placeholder={"Front"}
          value={formData.name}
          onChange={handleInput}
        />
        <label htmlFor="back" />
        <textarea
          type="text"
          id="back"
          name="back"
          placeholder="Back"
          value={formData.description}
          onChange={handleInput}
        />
      </form>
      <div>
        <NavLink to={`/decks/${deckId}`}>
          <button>Done</button>
        </NavLink>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
}

export default AddCard;
