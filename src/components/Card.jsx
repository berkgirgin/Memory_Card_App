import { useState, useEffect, useRef } from "react";

function Card({ cardEntry, onCardClick }) {
  const imgUrl = cardEntry.imageUrl;
  const characterName = capitalizeFirstLetter(cardEntry.name);
  const isPlayedStatus = cardEntry.isPlayed ? "yes" : "no";

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="card-container" onClick={onCardClick}>
      <div className="card-image-container">
        <img src={imgUrl} alt="card-image" />
      </div>
      <div className="character-name">{characterName}</div>
      <div className="is-played">is Played: {isPlayedStatus}</div>
    </div>
  );
}
export default Card;
