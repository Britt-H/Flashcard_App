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
import { listDecks, deleteCard, deleteDeck } from "../utils/api";

function Layout() {

  let [deckList, setDeckList] = useState([])
  
  function buildDeckList () {
    listDecks()
          .then((decks) => {
          setDeckList(decks)
          })
  }

  useEffect(buildDeckList,[])

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
            <CreateDeck buildDeckList={buildDeckList}/>
          </Route>
          <Route path="/deck/:deckId">
            <ViewDeck buildDeckList={buildDeckList} deckList={deckList}/>
          </Route>
          <Route path="/" exact={true} >
            <DeckList buildDeckList={buildDeckList} deckList={deckList}/>
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
