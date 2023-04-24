import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Switch, useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";
import Deck from "./Deck"
import { listDecks } from "../utils/api";

function DeckList () {
    
    let [deckList, setDeckList] = useState([])

    useEffect(() => {
        listDecks()
            .then((decks) => {
            console.log('Promise Resolved', decks)
            setDeckList(decks)
            })
        },[]
    )
    
    console.log('before return', deckList)
    
    return <div>
        {deckList.map((oneDeck, indx) => <Deck key={indx} data={oneDeck} />)}
    </div>
}

export default DeckList;