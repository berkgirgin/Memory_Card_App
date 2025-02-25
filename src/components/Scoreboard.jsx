import { useState, useEffect, useRef } from "react";
import trophyImg from "../assets/images/trophy.png";

function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="scoreboard-container">
      <div className="current-score-container">
        <div className="current-score-title">Current Score</div>
        <div className="current-score-value">{currentScore}</div>
      </div>
      <div className="best-score-container">
        <div className="best-score-title-container">
          <span>
            <img className="best-score-image" src={trophyImg} alt="" />
          </span>
          <div className="best-score-title">Best Score</div>
        </div>

        <div className="best-score-value">{bestScore}</div>
      </div>
    </div>
  );
}

export default Scoreboard;
