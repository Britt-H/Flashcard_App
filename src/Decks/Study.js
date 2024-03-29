import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useParams,
  NavLink,
} from "react-router-dom";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  let [deck, setDeck] = useState({
    id: "",
    name: "",
    description: "",
    cards: [],
  });
  let [side, setSide] = useState(true);
  let [cardIndex, setCardIndex] = useState(0);
  const [show, setShow] = useState(true);

  function flipHandler() {
    if (side) {
      setSide(false);
      setShow(!show);
    } else {
      setSide(true);
      setShow(!show);
    }
  }

  function nextHandler() {
    setSide(true);
    setCardIndex(cardIndex + 1);
    setShow(!show);
    if (cardIndex >= deck.cards.length - 1) {
      if (
        window.confirm(
          "Restart cards?\nClick 'cancel' to return to the home page"
        )
      ) {
        history.go(0);
      } else {
        history.push("/");
      }
    }
  }

  useEffect(() => {
    readDeck(deckId).then((deck) => {
      setDeck(deck);
    });
  }, []);

  if (deck.cards?.length < 3) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Not enough cards.</h5>
            <p className="card-text">
              You need at least 3 cards to study. There are {deck.cards.length}{" "}
              cards in this deck.
            </p>

            <NavLink to={`/decks/${deckId}/cards/new`}>
              <button>+ Add New</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardIndex + 1} of {deck.cards?.length}
            </h5>
            <p className="card-text">
              {side
                ? deck.cards[cardIndex]?.front
                : deck.cards[cardIndex]?.back}
            </p>
            {show && <button onClick={flipHandler}>Flip</button>}
            {!show && <button onClick={nextHandler}>Next</button>}
          </div>
        </div>
      </div>
    );
  }
}

export default Study;