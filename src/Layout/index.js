import React from "react";
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
} from "react-router-dom";
import DeckList from "../Decks/DeckList";
import Study from "../Decks/Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <button>Create Deck</button>
        <Switch>
          <Route path="/deck/:deckId/study">
            <Study />
          </Route>
          <Route path="/" exact={true}>
            <DeckList />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
