import { useState, useEffect } from "react";
import birdPokemonImg from "../assets/images/pokemon_bird.png";

function StartPage({ setDifficultyLevel }) {
  return (
    <div className="start-page-main-container">
      <div className="game-logo-container">
        <img className="game-logo" src={birdPokemonImg} alt="game-logo" />
      </div>

      <div className="game-title">Memory Game</div>

      <div className="difficulty-levels-container buttons-container">
        <button
          className="set-difficuly-button easy-difficuly-button"
          onClick={() => {
            setDifficultyLevel(0);
          }}
        >
          Easy
        </button>
        <button
          className="set-difficuly-button medium-difficuly-button"
          onClick={() => {
            setDifficultyLevel(1);
          }}
        >
          Medium
        </button>
        <button
          className="set-difficuly-button hard-difficuly-button"
          onClick={() => {
            setDifficultyLevel(2);
          }}
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default StartPage;
