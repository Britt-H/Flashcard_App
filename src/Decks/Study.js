import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  let { deckId } = useParams();
  let [deck, setDeck] = useState({});
  let [cardIndex, setCardIndex] = useState(0);
  let [side, setSide] = useState(true);

  function flipHandler() {
    if (side) {
      setSide(false);
    } else {
      setSide(true);
    }
  }

  useEffect(() => {
    readDeck(deckId).then((decks) => {
      setDeck(decks);
    });
  }, []);

  if (!deck.cards) {
    return <div>Loading</div>;
  }

  if (cardIndex >= deck.cards.length) {
    if (window.confirm("Restart Card?")) {
      window.location.replace(`/deck/${deckId}/study`);
    } else {
      window.location.replace("/");
    }
  }

  return (
    <div>
      <h1>{deck.name}</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>

      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{deck.name}</h3>
          <h3 className="card-title">
            Card {cardIndex + 1} of {deck.cards?.length}
          </h3>
          <h3 className="card-title">
            {side ? deck.cards[cardIndex]?.front : deck.cards[cardIndex]?.back}
          </h3>
        </div>
        <div>
          <button className="card-text" onClick={flipHandler}>
            Flip
          </button>
          <button
            className="card-text"
            onClick={() => setCardIndex(cardIndex + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Study;
