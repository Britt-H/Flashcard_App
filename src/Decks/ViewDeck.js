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
import { deleteDeck, deleteCard, readDeck } from "../utils/api";

//NEEDS TO USE readDeck function
//MAY NEED TO LOOK AT OTHER COMPONENTS REQUIREMENTS

function ViewDeck({ deckList, buildDeckList }) {
  const { deckId } = useParams();

  //Might replace targetDeck with readDeck use
  let targetDeck = deckList.find((deck) => {
    return Number(deck.id) === Number(deckId);
  });

  const history = useHistory();

  function handleDeleteDeck(event) {
    event.preventDefault();
    let result = window.confirm("Delete Deck?");
    if (result) {
      deleteDeck(deckId).then(() => {
        buildDeckList();
        history.push(`/`);
      });
    }
  }

  function handleDeleteCard(cardId) {
    let result = window.confirm("Delete Card?");
    if (result) {
      deleteCard(cardId).then(() => {
        buildDeckList();
        history.push(`/decks/${deckId}`);
      });
    }
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{targetDeck?.name}</li>
          </ol>
        </nav>
      </div>
      <div>
        <h3>{targetDeck?.name}</h3>
        <p className="card-text">{targetDeck?.description}</p>
        <Link to={`/decks/${targetDeck?.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/decks/${targetDeck?.id}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`/decks/${targetDeck?.id}/cards/new`}>
          <button>Add Card</button>
        </Link>
        <button className="card-text" onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>
      <div className="card">
        <ul className="list-group list-group-flush">
          {targetDeck?.cards.map((card, indx) => {
            return (
              <li key={indx} className="list-group-item">
                <p>{card?.front}</p>
                <p>{card?.back}</p>
                <Link to={`/decks/${targetDeck?.id}/cards/${card.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button className="card-text" onClick={() => handleDeleteCard(card.id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ViewDeck;
