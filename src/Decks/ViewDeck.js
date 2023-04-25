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
import Deck from "./Deck";

function ViewDeck({ deckList }) {
  const { deckId } = useParams();
  let targetDeck = deckList[deckId-1];
  return (
    <div>
      This is the deck you want to view
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/deck/deckId">{targetDeck?.name}</Link>
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <h3>{targetDeck?.name}</h3>
        <p className="card-text">{targetDeck?.description}</p>
        <button>Edit</button>
        <Link to={`/deck/${targetDeck?.id}/study`}>
          <button>Study</button>
        </Link>
        <button>+Add Card</button>
        <button>Delete</button>
      </div>
      <div className="card">
        <ul className="list-group list-group-flush">
          {targetDeck?.cards.map((card, indx) => {
            return (
              <li key={indx} className="list-group-item">
                <p>{card?.front}</p>
                <p>{card?.back}</p>
                <button>edit</button>
                <button>delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ViewDeck;
