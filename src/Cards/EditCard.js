import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useParams,
  NavLink,
} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function EditCard({ deckList, buildDeckList }) {
  const { cardId, deckId } = useParams();
  const history = useHistory();

  let targetDeck = deckList.find((deck) => {
    return Number(deck.id) === Number(deckId);
  });

  let targetCard = targetDeck?.cards.find((card) => {
    return Number(card.id) === Number(cardId);
  });

  let defaultForm = {
    front: "",
    back: "",
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
    readDeck(deckId).then(() => {
      readCard(cardId).then((res) => {
        formData.id = res.id;
        formData.deckId = res.deckId;
        updateCard(formData).then(() => {
          buildDeckList();
          history.push(`/decks/${deckId}/`);
        });
      });
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
      <form name="edit">
        <label htmlFor="front" />
        <textarea
          type="text"
          id="front"
          name="front"
          placeholder={targetCard && targetCard.front}
          value={formData.front}
          onChange={handleInput}
        />
        <label htmlFor="back" />
        <textarea
          type="text"
          id="back"
          name="back"
          placeholder={targetCard && targetCard.back}
          value={formData.back}
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

export default EditCard;
