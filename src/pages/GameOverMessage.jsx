import { useState, useEffect, useRef } from "react";
import weirdPokemonImg from "../assets/images/pokemon_weird.png";
// TO DO: add images for lost and won cases

// gets the input "won" or "lost"
function GameOverMessage({ finalScore, result, onPlayAgain, onQuit }) {
  let gameOverMessage;

  switch (result) {
    case "lost":
      gameOverMessage = "Game Over :(";
      break;
    case "won":
      gameOverMessage = "You Won! :)";
      break;
    case null:
      throw new Error("you called GameOverMessage while game is NOT over");
      break;
  }

  return (
    <div className="game-over-popup-main-container">
      <div className="game-over-popup-title">{gameOverMessage}</div>
      <div className="game-over-popup-image-container">
        <img
          src={weirdPokemonImg}
          alt="game-over-popup-image"
          className="game-over-popup-image"
        />
      </div>
      <div className="game-over-popup-score-message">
        Final score: {finalScore}
      </div>

      <div className="game-over-popup-buttons-container buttons-container">
        <button className="game-over-popup-button" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="game-over-popup-button" onClick={onQuit}>
          Change Difficulty
        </button>
      </div>
    </div>
  );
}

export default GameOverMessage;
