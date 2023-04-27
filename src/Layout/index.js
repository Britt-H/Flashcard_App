import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import DeckList from "../Decks/DeckList";
import Study from "../Decks/Study";
import ViewDeck from "../Decks/ViewDeck";
import CreateDeck from "../Decks/CreateDeck"
import { listDecks, deleteCard, deleteDeck } from "../utils/api";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

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
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard deckList={deckList} buildDeckList={buildDeckList} />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard deckList={deckList} buildDeckList={buildDeckList}/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck buildDeckList={buildDeckList}/>
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck buildDeckList={buildDeckList} deckList={deckList}/>
          </Route>
          <Route path="/decks/:deckId">
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
    </div>
  );
}

export default Layout;
