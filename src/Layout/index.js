import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  NavLink,
} from "react-router-dom";
import DeckList from "../Decks/DeckList";
import Study from "../Decks/Study";
import ViewDeck from "../Decks/ViewDeck";
import CreateDeck from "../Decks/CreateDeck"
import { listDecks } from "../utils/api";

function Layout() {

  let [deckList, setDeckList] = useState([])

  useEffect(() => {
      listDecks()
          .then((decks) => {
          setDeckList(decks)
          })
      },[]
  )

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/deck/:deckId/study">
            <Study />
          </Route>
          <Route path="/deck/new">
            <CreateDeck />
          </Route>
          <Route path="/deck/:deckId">
            <ViewDeck deckList={deckList}/>
          </Route>
          <Route path="/" exact={true} >
            <DeckList deckList={deckList}/>
          </Route> 
          <Route>
            <NotFound />
          </Route>         
        </Switch>
      </div>
    </>
  );
}

export default Layout;
