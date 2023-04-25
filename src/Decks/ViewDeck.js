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
import { deleteDeck } from "../utils/api";

function ViewDeck({ deckList, buildDeckList }) {
  const { deckId } = useParams();

  let targetDeck = deckList.find((deck) => {
    return Number(deck.id) === Number(deckId);
  });

  const history = useHistory();

  // useEffect(() => {
  //   if (cardIndex >= deck.cards?.length) {
  //     let result = window.confirm("Restart Card?")
  //     if (result) {
  //       history.go(0)
  //     } else {
  //       history.push("/")
  //     }
  //   }
  // },[cardIndex])

  function handleDeleteDeck(event) {
    event.preventDefault();
    let result = window.confirm("Delete Card?");
    if (result) {
      deleteDeck(deckId).then((res) => {
        buildDeckList();
        history.push(`/`);
      });
    }
  }

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
              {targetDeck?.name}
              {/* <Link to={`/deck/${deckList?.id}`}>{targetDeck?.name}</Link> */}
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
                <button>edit</button>
                <button>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ViewDeck;
