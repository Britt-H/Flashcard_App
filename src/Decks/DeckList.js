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
  Route,
} from "react-router-dom";
import Deck from "./Deck";

function DeckList({ deckList }) {
  return (
    <div>
      <Route>
        <NavLink to={`deck/new`}>
          <button>Create Deck</button>
        </NavLink>
      </Route>
      {deckList.map((oneDeck, indx) => (
        <Deck key={indx} data={oneDeck} />
      ))}
    </div>
  );
}

export default DeckList;
