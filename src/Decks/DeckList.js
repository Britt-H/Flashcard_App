import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";
import Deck from "./Deck"
import { listDecks } from "../utils/api";

function DeckList () {
    
    let [deckList, setDeckList] = useState([])

    useEffect(() => {
        listDecks()
            .then((decks) => {
            setDeckList(decks)
            })
        },[]
    )
    
    return <div>
        {deckList.map((oneDeck, indx) => <Deck key={indx} data={oneDeck} />)}
    </div>
}

export default DeckList;