import { useState, useEffect, useRef } from "react";
import Card from "../components/Card.jsx";
import example_cardBoard from "../example_cardBoard.jsx";
import GameOverMessage from "./GameOverMessage.jsx";
import Scoreboard from "../components/Scoreboard.jsx";

function GamePage({
  numberOfCards,
  fetchedCardBoard,
  setDifficultyLevel,
  bestScore,
  setBestScore,
}) {
  const [cardBoard, setCardBoard] = useState(fetchedCardBoard);

  const randomEntries = generateRandomEntriesArray(cardBoard);
  const [displayedEntries, setDisplayedEntries] = useState(randomEntries);

  const [gameOverState, setGameOverState] = useState(null); // "won" or "lost" or null

  let currentScore = useRef(0);

  const cardsToDisplay = displayedEntries.map((displayedEntry, _index) => {
    return (
      <Card
        key={displayedEntry.id}
        cardEntry={displayedEntry}
        playTurn={() => {
          playTurn(displayedEntry);
        }}
      />
    );
  });

  function generateRandomEntriesArray(_cardBoard) {
    const shuffledBoard = [..._cardBoard].sort(() => Math.random() - 0.5);

    return shuffledBoard;
    // return selectedEntries;
  }

  function createUpdatedCardBoard(id) {
    if (id === "all") {
      return cardBoard.map((card) => ({ ...card, isPlayed: false }));
    } else {
      return cardBoard.map((card) =>
        card.id === id ? { ...card, isPlayed: true } : card
      );
    }
  }

  function getIsGameWon(_cardBoard) {
    return _cardBoard.every((card) => card.isPlayed);
  }

  function playTurn(_clickedCard) {
    console.log("playTurn is clicked");
    console.log(_clickedCard.title);

    if (_clickedCard.isPlayed === true) {
      //losing screen / make cards closed
      //GAME OVER logic (comes with restart button?)
      gameOver("lost");
      return;
    }

    const updatedCardBoard = createUpdatedCardBoard(_clickedCard.id);
    setCardBoard(updatedCardBoard); // updates after func runs
    console.log(updatedCardBoard);
    console.log(cardBoard);

    const isGameWon = getIsGameWon(updatedCardBoard);
    if (isGameWon) {
      // winning screen / make cards closed
      // GAME OVER logic (comes with restart button?)
      currentScore.current++;
      gameOver("won");
      return;
    }
    console.log("before setDisplayedEntries");

    setDisplayedEntries(generateRandomEntriesArray(updatedCardBoard));

    currentScore.current++;
  }

  function restartGame() {
    setGameOverState(null);

    // reset currentScore, update bestScore
    setBestScore;

    if (bestScore < currentScore.current) {
      setBestScore(currentScore.current);
    }
    currentScore.current = 0;

    //make all cardBoard entries isPlayed: false
    const updatedCardBoard = createUpdatedCardBoard("all");
    setCardBoard(updatedCardBoard);

    //shuffle the cards
    const randomEntriesArray = generateRandomEntriesArray(updatedCardBoard);
    setDisplayedEntries(randomEntriesArray);

    // make pop-up black background disappear
  }

  function resetGame() {
    // to go back to the difficult settings
    restartGame();
    setDifficultyLevel(null);
  }

  function gameOver(wonOrLost) {
    // gets input "won" or "lost"

    // make pop-up black background appear

    if (wonOrLost === "lost") {
      console.log("YOU LOST!");
      setGameOverState("lost");
    } else if (wonOrLost === "won") {
      console.log("YOU WON!");
      setGameOverState("won");
    } else {
      throw new Error(`this function's inputs can only be "won" or "lost"`);
    }
  }

  return (
    <div className="game-page-main-container">
      <Scoreboard currentScore={currentScore.current} bestScore={bestScore} />

      <div className="cards-container">{cardsToDisplay}</div>

      <div className="game-over-message-main-container">
        {gameOverState && (
          <GameOverMessage
            finalScore={currentScore.current}
            result={gameOverState}
            onPlayAgain={restartGame}
            onQuit={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default GamePage;
