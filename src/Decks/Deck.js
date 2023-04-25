import React, { useState } from "react";
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
import { deleteDeck } from "../utils/api";

function Deck({ data, buildDeckList }) {
  const history = useHistory();

  function handleDeleteDeck(event) {
    event.preventDefault();
    let result = window.confirm("Delete Card?");
    if (result) {
      deleteDeck(data.id).then((res) => {
        buildDeckList();
        history.push(`/`);
      });
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{data.name} </h3>
        <h3 className="card-title">{data.cards.length}</h3>
      </div>

      <div>
        <h5 className="card-title">{data.description}</h5>
      </div>

      <div>
        <NavLink to={`deck/${data.id}`}>
          <button className="card-text">View</button>
        </NavLink>
        <NavLink to={`deck/${data.id}/study`}>
          <button>Study</button>
        </NavLink>
        <button className="card-text" onClick={handleDeleteDeck}>
          Delete
        </button>
        {/* <button onClick={handleSubmit}>Submit</button> */}
      </div>
    </div>
  );
}

export default Deck;
