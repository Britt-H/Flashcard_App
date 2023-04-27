import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCard({ buildDeckList }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    readDeck(deckId).then((res) => {
      setDeck(res);
      readCard(cardId).then((res) => {
        setCard(res);
      });
    });
  }, []);

  let initialFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  function handleInputChange(event) {
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    readDeck(deckId).then((res) => {
      readCard(cardId).then((res) => {
        formData.id = res.id;
        formData.deckId = res.deckId;

        updateCard(formData).then((res) => {
          buildDeckList();
          history.push(`/decks/${deckId}`);
        });
      });
    });
  }

  return (
    <React.Fragment>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck && deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">Add Card</li>
          </ol>
        </nav>
      </div>

      <h1>Edit Card</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="front"></label>
          Front
          <textarea
            type="text"
            name="front"
            id="front"
            value={card && card.front}
            onChange={handleInputChange}
          ></textarea>
          <label htmlFor="back"></label>
          Back
          <textarea
            type="text"
            name="back"
            id="back"
            value={card && card.back}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <Link to={"/"}>
          <button>Done</button>
        </Link>
        <button onClick={handleSubmit}>Save</button>
      </form>
    </React.Fragment>
  );
}

export default EditCard;
