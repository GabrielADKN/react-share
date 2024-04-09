import React, { useState } from "react";
import {v1 as uuid} from "uuid";
import axios from "axios";
import PlayingCard from "./PlayingCard.jsx";
import "./PlayingCardList.css";
import useAxios from "./hooks/useAxios.jsx";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, setCards] = useState([]);
  const { fetchData, error, loading } = useAxios("https://deckofcardsapi.com/api/deck/new/draw/");
  if (error) {
    return <h3>ERROR: {error.message}</h3>;
  }
  const addCard = async () => {
    const cardData = await fetchData('', data => ({ ...data, id: uuid() }));
    if (cardData) {
      setCards(cards => [...cards, cardData]);
    }
  };
  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={addCard}>Add a playing card!</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.cards[0].image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
