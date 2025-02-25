import { useState, useEffect, useRef } from "react";

function Card({ cardEntry, playTurn }) {
  const imgUrl = cardEntry.imageUrl;
  const pokemonName = capitalizeFirstLetter(cardEntry.name);
  const isPlayedStatus = cardEntry.isPlayed ? "yes" : "no";

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="card-container" onClick={playTurn}>
      <div className="card-image-container">
        <img src={imgUrl} alt="card-image" />
      </div>
      <div className="pokemon-name">{pokemonName}</div>
      {/* <div className="is-played">is Played: {isPlayedStatus}</div> */}
    </div>
  );
}
export default Card;
